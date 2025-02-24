# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import re
from enum import Enum
import qrcode
import os


class WSEACLeadStatus(Enum):
    NEW = "New"
    CONFIRMATION_EMAIL_SENT = "Confirmation Email Sent"
    CHECKED_IN = "Checked in"


class WSEACTestStatus(Enum):
    WAITING_FOR_INVITATION = "Waiting For Invitation"
    INVITATION_EMAIL_SENT = "Invitation Email Sent"
    REGISTERED_FOR_TEST = "Registered For Test"
    CHECKED_IN_TEST = "Checked In Test"


class WSEACLead(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        booking_id: DF.Data | None
        contact_email: DF.Data
        group_name: DF.Data
        invitation_sent_at: DF.Datetime | None
        mobile_number: DF.Data | None
        parent_full_name: DF.Data | None
        progress_status: DF.Literal[
            "Waiting For Invitation",
            "Invitation Email Sent",
            "Registered For Test",
            "Checked In Test",
        ]
        qr_code: DF.AttachImage | None
        registered_slot: DF.Link | None
        registration_number: DF.Data
        registration_timestamp: DF.Datetime | None
        status: DF.Literal["New", "Confirmation Email Sent", "Checked in"]
        student_full_name: DF.Data
        student_grade: DF.Literal[
            "K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "K10", "K11", "K12"
        ]
        test_checked_in_at: DF.Datetime | None
        test_registered_at: DF.Datetime | None
        test_score: DF.Float
    # end: auto-generated types

    def validation(self):
        # Check if registration_number has format "G{grade}-{number}"
        if not re.match(r"G\d+-\d+", self.registration_number):
            frappe.throw("Registration Number must have format 'G{grade}-{number}'")
        student_grade = int(self.registration_number.split("-")[0][1:])
        if student_grade < 1 or student_grade > 12:
            frappe.throw("Invalid Grade in Registration Number")
        else:
            self.student_grade = f"K{student_grade}"

    def before_insert(self):
        self.generate_qr_code()
        self.generate_booking_id()

    def before_save(self):
        # if registered_slot is changed, check if the new slot is full and update the current_registered field
        previous_doc = self.get_doc_before_save()
        if previous_doc and previous_doc.registered_slot != self.registered_slot:
            pass

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

    def send_confirmation_email(self):
        settings = frappe.get_single("WSE AC Settings")
        if not settings.open_nhtn_event:
            frappe.throw("NHTN event is closed")

        # send confirmation email
        if self.status == WSEACLeadStatus.NEW.value:

            frappe.sendmail(
                sender="admissions@wellspringsaigon.edu.vn",
                reply_to="admissions@wellspringsaigon.edu.vn",
                recipients=[self.contact_email],
                subject='WSSG. SY2025-2026 | Xac nhan tham du Ngay hoi Trai nghiem "Cung con khoi dau Hanh phuc"_Confirmation of attending the Experience Day_22.02.2025',
                template="ac_confirmation_email",
                args={"lead": self},
            )
            self.status = WSEACLeadStatus.CONFIRMATION_EMAIL_SENT.value
            self.save()

    def send_test_invitation_email(self):
        is_test_registration_open(allow_admin=False)

        # send test invitation email
        if self.progress_status == WSEACTestStatus.WAITING_FOR_INVITATION.value:
            frappe.sendmail(
                sender="admissions@wellspringsaigon.edu.vn",
                reply_to="admissions@wellspringsaigon.edu.vn",
                recipients=[self.contact_email],
                subject="WSSG. SY2025-2026 | THƯ MỜI ĐĂNG KÝ LỊCH KHẢO SÁT ĐẦU VÀO DÀNH CHO LỚP 1/INVITATION TO REGISTER FOR THE PLACEMENT TEST FOR GRADE 1",
                template=(
                    "ac_test_invitation_after_event"
                    if self.status == WSEACLeadStatus.CHECKED_IN.value
                    else "ac_test_invitation_general"
                ),
                args={
                    "lead": self,
                    "registration_link": f"{frappe.utils.get_url()}/events/placement-test/registration/{self.booking_id}",
                },
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
        # send test registration confirmation email
        if self.progress_status == WSEACTestStatus.REGISTERED_FOR_TEST.value:
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
            account_number = "0531000929292"
            account_name = "Công ty TNHH MTV Đầu Tư và Phát Triển Giáo Dục SSG"
            bin_number = "970436"
            bank_name = (
                "Ngân hàng TMCP Ngoại Thương Việt Nam (VCB) - Chi nhánh Gia Định"
            )
            bank_short_name = "VCB"
            amount = 2000000
            add_info = (
                f"{self.student_full_name} {self.registration_number} PHI KS NH25-26"
            )

            frappe.sendmail(
                sender="admissions@wellspringsaigon.edu.vn",
                reply_to="admissions@wellspringsaigon.edu.vn",
                recipients=[self.contact_email],
                subject="WSSG Xac nhan Lich khao sat dau vao NH2024-2025/WSSG Confirmation of The Placement test Schedule 2024-2025",
                template="ac_test_registration_confirmation",
                args={
                    "lead": self,
                    "test_slot": test_slot,
                    "weekday_vn": weekday_vn,
                    "weekday_en": weekday_en,
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
                },
                now=True,
            )

    def register_for_test(self, slot_id, send_email=True):
        is_test_registration_open()

        # register for test
        current_registered = frappe.db.count(
            "WSE AC Lead",
            filters={
                "registered_slot": slot_id,
            },
        )
        test_slot = frappe.get_doc("WSE AC Test Slot", slot_id)
        if current_registered < test_slot.max_capacity:
            if test_slot.is_enabled:
                self.registered_slot = slot_id
                self.progress_status = WSEACTestStatus.REGISTERED_FOR_TEST.value
                self.test_registered_at = frappe.utils.now()
                self.save()

                test_slot.current_registered = current_registered + 1
                test_slot.save()

                if send_email:
                    self.send_test_registration_confirmation_email()
            else:
                frappe.throw("Test Slot is disabled")
        else:
            frappe.throw("Test Slot is full")


def is_test_registration_open(allow_admin=True):
    if allow_admin and ("WSE AC Admin" in frappe.get_roles()):
        return True

    settings = frappe.get_single("WSE AC Settings")
    if not settings.open_test_registration:
        frappe.throw("Test registration is closed")
    if settings.test_registration_closing_time and (
        frappe.utils.now() > settings.test_registration_closing_time
    ):
        frappe.throw("Test registration is closed")
