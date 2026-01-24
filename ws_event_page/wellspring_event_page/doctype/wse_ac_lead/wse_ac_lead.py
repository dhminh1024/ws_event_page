# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import re
from enum import Enum
import qrcode
import os
import time


class WSEACLeadStatus(Enum):
    NEW = "New"
    EVENT_INVITATION_SENT = "Event Invitation Sent"
    REGISTERED_FOR_EVENT = "Registered for event"
    CONFIRMATION_EMAIL_SENT = "Confirmation Email Sent"
    CHECKED_IN = "Checked in"


class WSEACTestStatus(Enum):
    WAITING_FOR_INVITATION = "Waiting For Invitation"
    INVITATION_EMAIL_SENT = "Invitation Email Sent"
    REGISTERED_FOR_TEST = "Registered For Test"
    CHECKED_IN_TEST = "Checked In Test"


class WSEACErrorCode(Enum):
    # Lead API
    INVALID_BOOKING_ID = "WSEAC-E101: Invalid Booking ID"
    INVALID_LEAD_ID = "WSEAC-E102: Invalid Lead ID"
    PERMISSION_DENIED = "WSEAC-E103: Permission denied - Admin role required"
    ALREADY_REGISTERED = "WSEAC-E104: Already registered for a test"
    ALREADY_REGISTERED_FOR_SLOT = "WSEAC-E105: Already registered for this test slot"

    # WSE AC LEAD Doctype
    REGISTRATION_NUMBER_FORMAT = (
        "WSEAC-E201: Registration number must be in format 'G1-XXX'"
    )
    INVALID_GRADE_IN_REGISTRATION_NUMBER = (
        "WSEAC-E202: Invalid Grade in Registration Number"
    )
    EVENT_CLOSED = "WSEAC-E203: Event is closed"
    TEST_SLOT_DISABLED = "WSEAC-E204: Test slot is disabled"
    TEST_SLOT_FULL = "WSEAC-E205: Test slot is full"
    TEST_REGISTRATION_CLOSED = "WSEAC-E206: Test registration is closed"
    TEST_REGISTRATION_EXPIRED = "WSEAC-E207: Test registration is expired"
    EVENT_REGISTRATION_EXPIRED = "WSEAC-E208: Event registration has expired"


class WSEACResultType(Enum):
    PASS_TYPE_1 = "DS1"
    PASS_TYPE_2 = "DS2"
    PASS_TYPE_3 = "DS3"
    FAIL_TYPE = "DS4"


class WSEACLead(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        ac_event: DF.Link | None
        booking_id: DF.Data | None
        congratz_letter: DF.Attach | None
        contact_email: DF.Data
        crm_lead_id: DF.Data | None
        event_invitation_sent_at: DF.Datetime | None
        event_registered_at: DF.Datetime | None
        group_name: DF.Data | None
        invitation_sent_at: DF.Datetime | None
        mobile_number: DF.Data | None
        parent_full_name: DF.Data | None
        progress_status: DF.Literal["Waiting For Invitation", "Invitation Email Sent", "Registered For Test", "Checked In Test"]
        qr_code: DF.AttachImage | None
        registered_slot: DF.Link | None
        registration_number: DF.Data
        registration_timestamp: DF.Datetime | None
        result_folder_link: DF.Data | None
        result_report: DF.Attach | None
        result_type: DF.Literal["DS1", "DS2", "DS3", "DS4"]
        status: DF.Literal["New", "Event Invitation Sent", "Registered for event", "Confirmation Email Sent", "Checked in"]
        student_full_name: DF.Data
        student_gender: DF.Data
        student_grade: DF.Literal["G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "G12"]
        test_checked_in_at: DF.Datetime | None
        test_registered_at: DF.Datetime | None
        test_slot_date: DF.Date | None
        test_slot_end_time: DF.Time | None
        test_slot_start_time: DF.Time | None
    # end: auto-generated types

    def validation(self):
        # Check if registration_number has format "G{grade}-{number}"
        if not re.match(r"G\d+-\d+", self.registration_number):
            frappe.throw(WSEACErrorCode.REGISTRATION_NUMBER_FORMAT.value)
        student_grade = int(self.registration_number.split("-")[0][1:])
        if student_grade < 1 or student_grade > 12:
            frappe.throw(WSEACErrorCode.INVALID_GRADE_IN_REGISTRATION_NUMBER.value)
        else:
            self.student_grade = f"G{student_grade:02d}"

    def before_insert(self):
        self.generate_qr_code()
        self.generate_booking_id()
        self._assign_current_event()

    def _assign_current_event(self):
        """Assign the current active event to this lead if not already set."""
        if not self.ac_event:
            settings = frappe.get_single("WSE AC Settings")
            if settings.current_event:
                self.ac_event = settings.current_event

    def _get_event_settings(self):
        """
        Get event settings, preferring the linked event or current event.
        Falls back to legacy settings if no event is configured.
        """
        if self.ac_event:
            return frappe.get_doc("WSE AC Event", self.ac_event)

        # Fallback to current event from settings
        settings = frappe.get_single("WSE AC Settings")
        if settings.current_event:
            return frappe.get_doc("WSE AC Event", settings.current_event)

        # Legacy fallback - return settings as dict-like object
        return settings

    def before_save(self):
        """Update test slot counts when registered_slot changes via desk edit."""
        # Skip if called from register_for_test() - it handles counts itself
        if getattr(self.flags, "skip_slot_sync", False):
            return

        previous_doc = self.get_doc_before_save()
        if previous_doc and previous_doc.registered_slot != self.registered_slot:
            # Decrement old slot count
            if previous_doc.registered_slot:
                old_slot = frappe.get_doc(
                    "WSE AC Test Slot", previous_doc.registered_slot
                )
                old_slot.calculate_current_registered(-1)

            # Increment new slot count (if registering to a new slot)
            if self.registered_slot:
                new_slot = frappe.get_doc("WSE AC Test Slot", self.registered_slot)
                new_slot.calculate_current_registered(1)

    def on_trash(self):
        """Decrement test slot count when lead is deleted."""
        if self.registered_slot:
            test_slot = frappe.get_doc("WSE AC Test Slot", self.registered_slot)
            test_slot.calculate_current_registered(-1)

    def generate_qr_code(self):
        # generate qr code
        img = qrcode.make(self.registration_number, box_size=10, border=1, version=3)
        file_name = f"wse_ac_lead_qr_code_{self.registration_number}.png"
        file_path = frappe.get_site_path() + "/public/files/" + file_name
        if os.path.exists(file_path):
            os.remove(file_path)
        img.save(file_path)

        # delete if exists before save
        attach_image = frappe.get_list(
            "File",
            filters=[
                ["file_name", "like", file_name],
                ["attached_to_field", "=", "qr_code"],
                ["attached_to_doctype", "=", "WSE AC Lead"],
                ["attached_to_name", "=", self.registration_number],
            ],
        )
        if attach_image:
            for att_img in attach_image:
                frappe.delete_doc("File", att_img.name)
        frappe.db.commit()

        # save qr_code image to file table
        attach_image = frappe.get_doc(
            {
                "doctype": "File",
                "file_name": file_name,
                "file_url": "/files/" + file_name,
                "attached_to_doctype": "WSE AC Lead",
                "attached_to_name": self.registration_number,
            }
        )
        attach_image.insert()

        self.qr_code = attach_image.file_url

    def generate_booking_id(self):
        # Based on the registration number, generate booking id by hashing, output is hexadecimal with 16 characters
        import hashlib

        encode = self.registration_number.encode()
        self.booking_id = hashlib.md5(encode).hexdigest()[:16]

    def send_result_confirmation_email(self):
        from frappe.email.doctype.email_template.email_template import (
            get_email_template,
        )

        # send confirmation email
        event_settings = self._get_event_settings()
        settings = frappe.get_single("WSE AC Settings")

        # Get template based on result type
        template_name = None
        template_type = None
        if self.result_type == WSEACResultType.PASS_TYPE_1.value:
            template_name = settings.result_ds1_template
            template_type = "Result DS1 (Pass)"
        elif self.result_type == WSEACResultType.PASS_TYPE_2.value:
            template_name = settings.result_ds2_template
            template_type = "Result DS2 (Pass)"
        elif self.result_type == WSEACResultType.PASS_TYPE_3.value:
            template_name = settings.result_ds3_template
            template_type = "Result DS3 (Pass)"
        elif self.result_type == WSEACResultType.FAIL_TYPE.value:
            template_name = settings.result_ds4_template
            template_type = "Result DS4 (Fail)"

        if not template_name:
            frappe.throw(
                f"{template_type} email template not configured. "
                "Please set it in WSE AC Settings."
            )

        if not frappe.db.exists("Email Template", template_name):
            frappe.throw(
                f"Email template '{template_name}' not found. "
                "Please create it or update WSE AC Settings."
            )

        attachments = []
        if event_settings.test_result_attachment:
            if self.result_type == WSEACResultType.FAIL_TYPE.value:
                attachments = [
                    {"file_url": self.result_report} if self.result_report else None,
                ]
            else:
                attachments = [
                    {"file_url": self.result_report} if self.result_report else None,
                    (
                        {"file_url": self.congratz_letter}
                        if self.congratz_letter
                        else None
                    ),
                ]
            attachments = [item for item in attachments if item]

        args = {"lead": self}
        email_template = get_email_template(template_name, args)

        frappe.sendmail(
            sender=settings.email_sender,
            reply_to=settings.email_reply_to,
            recipients=[self.contact_email],
            cc=[settings.email_cc] if settings.email_cc else None,
            attachments=attachments,
            subject=email_template.get("subject"),
            message=email_template.get("message"),
        )
        self.status = WSEACLeadStatus.CONFIRMATION_EMAIL_SENT.value
        self.save()

    def send_confirmation_email(self):
        from frappe.email.doctype.email_template.email_template import (
            get_email_template,
        )

        event_settings = self._get_event_settings()
        if not event_settings.open_nhtn_event:
            frappe.throw(WSEACErrorCode.EVENT_CLOSED.value)

        # send confirmation email
        if self.status in [
            WSEACLeadStatus.NEW.value,
            WSEACLeadStatus.EVENT_INVITATION_SENT.value,
            WSEACLeadStatus.REGISTERED_FOR_EVENT.value,
        ]:
            settings = frappe.get_single("WSE AC Settings")
            template_name = settings.confirmation_email_template

            if not template_name:
                frappe.throw(
                    "Confirmation email template not configured. "
                    "Please set it in WSE AC Settings."
                )

            if not frappe.db.exists("Email Template", template_name):
                frappe.throw(
                    f"Email template '{template_name}' not found. "
                    "Please create it or update WSE AC Settings."
                )

            args = {"lead": self}
            email_template = get_email_template(template_name, args)

            frappe.sendmail(
                sender=settings.email_sender,
                reply_to=settings.email_reply_to,
                recipients=[self.contact_email],
                subject=email_template.get("subject"),
                message=email_template.get("message"),
            )
            self.status = WSEACLeadStatus.CONFIRMATION_EMAIL_SENT.value
            self.save()

    def send_event_invitation_email(self):
        """Send event invitation email with registration link."""
        from frappe.email.doctype.email_template.email_template import (
            get_email_template,
        )

        event_settings = self._get_event_settings()
        if not event_settings.open_nhtn_event:
            frappe.throw(WSEACErrorCode.EVENT_CLOSED.value)

        if self.status == WSEACLeadStatus.NEW.value:
            settings = frappe.get_single("WSE AC Settings")
            template_name = settings.event_invitation_email_template

            if not template_name:
                frappe.throw(
                    "Event invitation email template not configured. "
                    "Please set it in WSE AC Settings."
                )

            if not frappe.db.exists("Email Template", template_name):
                frappe.throw(
                    f"Email template '{template_name}' not found. "
                    "Please create it or update WSE AC Settings."
                )

            registration_link = f"{frappe.utils.get_url()}/events/placement-test/event-registration/{self.booking_id}"

            args = {
                "lead": self,
                "registration_link": registration_link,
            }
            email_template = get_email_template(template_name, args)

            frappe.sendmail(
                sender=settings.email_sender,
                reply_to=settings.email_reply_to,
                recipients=[self.contact_email],
                subject=email_template.get("subject"),
                message=email_template.get("message"),
            )
            self.status = WSEACLeadStatus.EVENT_INVITATION_SENT.value
            self.event_invitation_sent_at = frappe.utils.now()
            self.save()

    def register_for_event(self):
        """Register the lead for the event (simple status update)."""
        event_settings = self._get_event_settings()
        if not event_settings.open_nhtn_event:
            frappe.throw(WSEACErrorCode.EVENT_CLOSED.value)

        # Check closing time
        if event_settings.event_registration_closing_time:
            current_time = frappe.utils.get_datetime(frappe.utils.now())
            if current_time > event_settings.event_registration_closing_time:
                frappe.throw(WSEACErrorCode.EVENT_REGISTRATION_EXPIRED.value)

        if self.status in [
            WSEACLeadStatus.NEW.value,
            WSEACLeadStatus.EVENT_INVITATION_SENT.value,
        ]:
            self.status = WSEACLeadStatus.REGISTERED_FOR_EVENT.value
            self.event_registered_at = frappe.utils.now()
            self.save()

    def send_test_invitation_email(self):
        from frappe.email.doctype.email_template.email_template import (
            get_email_template,
        )

        is_test_registration_open(allow_admin=False, lead=self)

        # send test invitation email
        if self.progress_status == WSEACTestStatus.WAITING_FOR_INVITATION.value:
            settings = frappe.get_single("WSE AC Settings")

            # Choose template based on lead status
            if self.status == WSEACLeadStatus.CHECKED_IN.value:
                template_name = settings.test_invitation_after_event_template
                template_type = "Test Invitation (After Event)"
            else:
                template_name = settings.test_invitation_general_template
                template_type = "Test Invitation (General)"

            if not template_name:
                frappe.throw(
                    f"{template_type} email template not configured. "
                    "Please set it in WSE AC Settings."
                )

            if not frappe.db.exists("Email Template", template_name):
                frappe.throw(
                    f"Email template '{template_name}' not found. "
                    "Please create it or update WSE AC Settings."
                )

            args = {
                "lead": self,
                "registration_link": f"{frappe.utils.get_url()}/events/placement-test/registration/{self.booking_id}",
            }
            email_template = get_email_template(template_name, args)

            frappe.sendmail(
                sender=settings.email_sender,
                reply_to=settings.email_reply_to,
                recipients=[self.contact_email],
                subject=email_template.get("subject"),
                message=email_template.get("message"),
            )
            self.progress_status = WSEACTestStatus.INVITATION_EMAIL_SENT.value
            self.invitation_sent_at = frappe.utils.now()
            self.save()

    def generate_qr_payment_code(
        self,
        account_number,
        account_name,
        bin_number,
        bank_short_name,
        amount,
        add_info,
    ):
        vietqr_url = f"https://img.vietqr.io/image/{bank_short_name}-{account_number}-VjSoh17.jpg?amount={amount}&addInfo={add_info}&accountName={account_name}&acqId={bin_number}"
        return vietqr_url

    def send_test_registration_confirmation_email(self):
        from frappe.email.doctype.email_template.email_template import (
            get_email_template,
        )

        # send test registration confirmation email
        if self.progress_status == WSEACTestStatus.REGISTERED_FOR_TEST.value:
            settings = frappe.get_single("WSE AC Settings")
            template_name = settings.test_registration_confirmation_template

            if not template_name:
                frappe.throw(
                    "Test Registration Confirmation email template not configured. "
                    "Please set it in WSE AC Settings."
                )

            if not frappe.db.exists("Email Template", template_name):
                frappe.throw(
                    f"Email template '{template_name}' not found. "
                    "Please create it or update WSE AC Settings."
                )

            test_slot = frappe.get_doc("WSE AC Test Slot", self.registered_slot)
            # Determine weekday of test_slot.date
            weekday_en = test_slot.date.strftime("%A")
            weekday_vn = {
                "Monday": "Thứ Hai",
                "Tuesday": "Thứ Ba",
                "Wednesday": "Thứ Tư",
                "Thursday": "Thứ Năm",
                "Friday": "Thứ Sáu",
                "Saturday": "Thứ Bảy",
                "Sunday": "Chủ Nhật",
            }[weekday_en]
            test_slot_start_time = str(test_slot.start_time).rsplit(":", 1)[0]
            test_slot_date = test_slot.date.strftime("%d/%m/%Y")

            # Get payment info from settings
            account_number = settings.bank_account_number
            account_name = settings.bank_account_name
            bin_number = settings.bank_bin_number
            bank_name = settings.bank_name
            bank_short_name = settings.bank_short_name
            amount = settings.payment_amount
            if settings.payment_info_template:
                add_info = settings.payment_info_template.format(
                    student_full_name=self.student_full_name,
                    registration_number=self.registration_number,
                )
            else:
                add_info = f"{self.student_full_name} - {self.registration_number}"

            args = {
                "lead": self,
                "test_slot": test_slot,
                "weekday_vn": weekday_vn,
                "weekday_en": weekday_en,
                "test_slot_start_time": test_slot_start_time,
                "test_slot_date": test_slot_date,
                "payment_qr_code": self.generate_qr_payment_code(
                    account_number,
                    account_name,
                    bin_number,
                    bank_short_name,
                    amount,
                    add_info,
                ),
                "account_number": account_number,
                "account_name": account_name,
                "bin_number": bin_number,
                "bank_name": bank_name,
                "bank_short_name": bank_short_name,
                "amount": amount,
                "add_info": add_info,
            }
            email_template = get_email_template(template_name, args)

            frappe.sendmail(
                sender=settings.email_sender,
                reply_to=settings.email_reply_to,
                recipients=[self.contact_email],
                subject=email_template.get("subject"),
                message=email_template.get("message"),
            )

    def register_for_test(self, slot_id, send_email=1):
        """
        Register for a test slot with concurrent access handling.

        Uses retry mechanism to handle race conditions during simultaneous
        registrations. Only TimestampMismatchError triggers retry; other
        errors fail immediately.
        """
        is_test_registration_open(lead=self)

        # Check if already registered for this slot
        if self.registered_slot == slot_id:
            frappe.throw(WSEACErrorCode.ALREADY_REGISTERED_FOR_SLOT.value)

        # Store previous slot ID (not document) for reloading in retry loop
        prev_slot_id = self.registered_slot
        max_retries = 8

        for attempt in range(max_retries):
            if attempt > 0:
                time.sleep(0.5)

            try:
                # Use savepoint for rollback capability on failure
                frappe.db.savepoint("register_test")

                # Reload test slot fresh each attempt
                test_slot = frappe.get_doc("WSE AC Test Slot", slot_id)

                # Check if slot is enabled (fail immediately, don't retry)
                if not test_slot.is_enabled:
                    frappe.throw(WSEACErrorCode.TEST_SLOT_DISABLED.value)

                # Note: We don't check test_slot.is_full here because the stored
                # flag may be stale. Instead, calculate_current_registered() will
                # count from DB and validate capacity with the real count.

                # Increment new slot count (will throw if slot is actually full)
                test_slot.calculate_current_registered(1)

                # Decrement previous slot if changing registration (reload fresh)
                if prev_slot_id:
                    prev_slot = frappe.get_doc("WSE AC Test Slot", prev_slot_id)
                    prev_slot.calculate_current_registered(-1)

                # Update lead registration details (inside retry block)
                self.registered_slot = slot_id
                self.progress_status = WSEACTestStatus.REGISTERED_FOR_TEST.value
                self.test_registered_at = frappe.utils.now()
                # Skip before_save slot sync - we handle counts directly above
                self.flags.skip_slot_sync = True
                self.save()

                break  # Success - exit retry loop

            except frappe.exceptions.TimestampMismatchError:
                # Only retry on timestamp mismatch (concurrent modification)
                frappe.db.rollback(save_point="register_test")
                if attempt == (max_retries - 1):
                    frappe.throw("System is busy, please try again later")
                # Otherwise continue to next attempt

        # Send confirmation email if requested
        if frappe.utils.cint(send_email):
            self.send_test_registration_confirmation_email()


def is_test_registration_open(allow_admin=True, lead=None):
    """
    Check if test registration is open.

    Args:
        allow_admin: If True, admins bypass the check.
        lead: Optional WSE AC Lead document to get event-specific settings.
    """
    if allow_admin and ("WSE AC Admin" in frappe.get_roles()):
        return True

    # Get event settings
    event_settings = None
    if lead and lead.ac_event:
        event_settings = frappe.get_doc("WSE AC Event", lead.ac_event)
    else:
        settings = frappe.get_single("WSE AC Settings")
        if settings.current_event:
            event_settings = frappe.get_doc("WSE AC Event", settings.current_event)
        else:
            # Legacy fallback
            event_settings = settings

    current_time = frappe.utils.get_datetime(frappe.utils.now())
    if not event_settings.open_test_registration:
        frappe.throw(WSEACErrorCode.TEST_REGISTRATION_CLOSED.value)
    if event_settings.test_registration_closing_time and (
        current_time > event_settings.test_registration_closing_time
    ):
        frappe.throw(WSEACErrorCode.TEST_REGISTRATION_EXPIRED.value)
