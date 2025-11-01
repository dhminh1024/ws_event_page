# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from enum import Enum
from ws_event_page.wellspring_event_page.doctype.wse_gs_registration.wse_gs_registration_process import (
    build_registration_name,
)


class GSRegistrationStatus(Enum):
    WAITING_FOR_APPROVAL = "Waiting for Approval"
    APPROVED = "Approved"
    CANCELLED = "Cancelled"


class WSEGSRegistration(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        attach_file: DF.Attach | None
        email: DF.Data
        entry_category: DF.Literal["Singing", "Dancing", "Instrumental", "Other"]
        entry_group: DF.Literal["Primary students", "Secondary students", "Adult"]
        entry_name: DF.Data
        entry_participants: DF.SmallText | None
        full_name: DF.Data
        gs_program: DF.Link
        instrumental_info: DF.Data | None
        mobile_number: DF.Data
        status: DF.Literal["Cancelled", "Approved", "Waiting for Approval"]
        talent_info: DF.Data | None
    # end: auto-generated types

    def autoname(self):
        """Generate auto name for registration with format WSEGSO{YY}{#####}."""
        if not self.name or self.name.startswith("new-wse-gs-registration"):
            self.name = build_registration_name(self)

    def after_insert(self):
        """Send confirmation email after creating the registration."""
        if self.status == GSRegistrationStatus.WAITING_FOR_APPROVAL.value:
            self.send_confirmation_email()

    def send_confirmation_email(self):
        """Send confirmation email to the registrant."""
        # Get settings document
        settings = frappe.get_single("WSE GS Settings")

        # Get email template from settings, use default if not found
        template_name = settings.confirmation_email_template
        if not template_name:
            template_name = "gs_registration_confirmation"

        sender = settings.email_sender or "greatestshow@wellspringsaigon.edu.vn"
        subject = "WSSG Greatest Show - Xác nhận đăng ký | Registration Confirmation"
        recipients = [self.email]

        # Get program title if available
        program_title = None
        if self.gs_program:
            program_title = frappe.db.get_value(
                "WSE GS Program", self.gs_program, "title_en"
            )

        args = dict(
            registration_id=self.name,
            full_name=self.full_name,
            email=self.email,
            mobile_number=self.mobile_number,
            entry_group=self.entry_group,
            entry_name=self.entry_name,
            entry_category=self.entry_category,
            entry_participants=self.entry_participants,
            instrumental_info=self.instrumental_info,
            talent_info=self.talent_info,
            status=self.status,
            program_title=program_title,
        )

        send_registration_email(template_name, sender, recipients, subject, args)

    def send_cancellation_email(self):
        """Send cancellation email to the registrant."""
        # Get settings document
        settings = frappe.get_single("WSE GS Settings")

        # Get email template from settings, use default if not found
        template_name = settings.cancellation_email_template
        if not template_name:
            template_name = "gs_registration_cancellation"

        sender = settings.email_sender or "greatestshow@wellspringsaigon.edu.vn"
        subject = "WSSG Greatest Show - Huỷ đăng ký | Registration Cancelled"
        recipients = [self.email]

        # Get program title if available
        program_title = None
        if self.gs_program:
            program_title = frappe.db.get_value(
                "WSE GS Program", self.gs_program, "title_en"
            )

        args = dict(
            registration_id=self.name,
            full_name=self.full_name,
            email=self.email,
            entry_name=self.entry_name,
            entry_category=self.entry_category,
            status=self.status,
            program_title=program_title,
        )

        send_registration_email(template_name, sender, recipients, subject, args)

    def send_approval_email(self):
        """Send approval email to the registrant."""
        # Get settings document
        settings = frappe.get_single("WSE GS Settings")

        # Get email template from settings, use default if not found
        template_name = settings.approval_email_template
        if not template_name:
            template_name = "gs_registration_approval"

        sender = settings.email_sender or "greatestshow@wellspringsaigon.edu.vn"
        subject = "WSSG Greatest Show - Đăng ký được phê duyệt | Registration Approved"
        recipients = [self.email]

        # Get program title if available
        program_title = None
        if self.gs_program:
            program_title = frappe.db.get_value(
                "WSE GS Program", self.gs_program, "title_en"
            )

        args = dict(
            registration_id=self.name,
            full_name=self.full_name,
            email=self.email,
            mobile_number=self.mobile_number,
            entry_group=self.entry_group,
            entry_name=self.entry_name,
            entry_category=self.entry_category,
            entry_participants=self.entry_participants,
            instrumental_info=self.instrumental_info,
            talent_info=self.talent_info,
            status=self.status,
            program_title=program_title,
        )

        send_registration_email(template_name, sender, recipients, subject, args)


def send_registration_email(email_template, sender, recipients, subject, args):
    """Helper function to send registration emails."""
    frappe.sendmail(
        sender=sender,
        recipients=recipients,
        subject=subject,
        template=email_template,
        args=args,
    )
