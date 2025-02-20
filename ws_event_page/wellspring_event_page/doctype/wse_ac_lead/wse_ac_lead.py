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


class WSEACLead(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        contact_email: DF.Data
        group_name: DF.Data
        mobile_number: DF.Data | None
        parent_full_name: DF.Data | None
        qr_code: DF.AttachImage | None
        registration_number: DF.Data
        registration_timestamp: DF.Datetime
        status: DF.Literal["New", "Confirmation Email Sent", "Checked in"]
        student_full_name: DF.Data
        student_grade: DF.Literal["K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "K10", "K11", "K12"]
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

    def before_save(self):
        if not self.registration_timestamp:
            self.registration_timestamp = frappe.utils.now()

    def before_insert(self):
        self.generate_qr_code()

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

    def send_confirmation_email(self):
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
