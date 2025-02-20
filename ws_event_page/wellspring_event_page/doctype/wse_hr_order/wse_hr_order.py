# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils.file_manager import save_file

from ws_event_page.api.utils.validation import validate_wellspring_code
from ws_event_page.wellspring_event_page.doctype.wse_hr_ticket.wse_hr_ticket import (
    HRTicketStatus,
    HRTicketType,
)
import requests
import json
from enum import Enum

logger = frappe.logger("WSE_HR_ORDER", allow_site=True, file_count=50)
settings = frappe.get_doc("WSE HR Settings")


class HROrderStatus(Enum):
    PENDING_PAYMENT = "Pending Payment"
    CANCELED = "Canceled"
    PAID = "Paid"


# get the WSE HR Settings for ticket prices
def get_ticket_price(ticket_type):
    if ticket_type == HRTicketType.HAPPY_RUN.value:
        return settings.happy_run_ticket_price
    elif ticket_type == HRTicketType.WELL_BEING.value:
        return settings.wellbeing_ticket_price
    else:
        frappe.throw("Invalid Ticket Type")


class WSEHROrder(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF
        from ws_event_page.wellspring_event_page.doctype.wse_hr_ticket.wse_hr_ticket import (
            WSEHRTicket,
        )

        email: DF.Data
        full_name: DF.Data
        mobile_number: DF.Data
        qr_payment_code: DF.AttachImage | None
        status: DF.Literal["Pending Payment", "Canceled", "Paid"]
        tickets: DF.Table[WSEHRTicket]
        total_paid: DF.Int
        total_payment_pending: DF.Int
        total_price: DF.Int
    # end: auto-generated types

    def validate(self):
        self.validate_wellspring_codes()

    def validate_wellspring_codes(self):
        if (
            not isinstance(self.tickets, list)
            or not self.tickets
            or len(self.tickets) == 0
        ):
            frappe.throw("At least one ticket is required")

        ws_code_count = 0
        for index, ticket in enumerate(self.tickets):
            ticket.ticket_price = get_ticket_price(ticket.ticket_type)

            if not ticket.wellspring_code:
                ticket.category = "Companion"
                if not ticket.full_name:
                    frappe.throw(f"Full Name is required for Companion {index + 1}")
                continue

            ws_code_count += 1
            ticket.category = "Primary"
            (user_type, student_staff, person) = validate_wellspring_code(
                ticket.wellspring_code
            )
            if user_type == "Student":
                ticket.person_id = person.name
                ticket.full_name = person.full_name
                ticket.email = person.email
                school_class = student_staff.get_current_class()
                if school_class:
                    ticket.school_class_title = school_class.title
            elif user_type == "Staff":
                ticket.person_id = person.name
                ticket.full_name = person.full_name
                ticket.email = person.email
                ticket.department = student_staff.department

        if ws_code_count == 0:
            frappe.throw("At least one Wellspring Code is required")

    def after_insert(self):
        """Send confirmation email after creating the order"""
        if self.status == HROrderStatus.PENDING_PAYMENT.value:
            self.send_order_confirmation_email()

    def before_save(self):
        # previous_status = self.get_doc_before_save().status
        # if previous_status == "Canceled":
        #     frappe.throw("Order is already canceled")

        self.calculate_total_price()
        if self.status == HROrderStatus.PENDING_PAYMENT.value:
            self.generate_qr_payment_code()

    def generate_qr_payment_code(self):
        account_number = settings.account_number
        account_name = settings.account_name
        bin_number = settings.bin_number
        bank_short_name = settings.bank_short_name
        if not all([account_number, account_name, bin_number, bank_short_name]):
            frappe.throw(f"VietQR settings are not configured: {settings}")
        vietqr_url = f"https://img.vietqr.io/image/{bank_short_name}-{account_number}-VjSoh17.jpg?amount={self.total_payment_pending}&addInfo={self.name}&accountName={account_name}&acqId={bin_number}"
        self.qr_payment_code = vietqr_url

    def __generate_qr_payment_code_v1(self):
        vietqr_url = settings.vietqr_url
        account_number = settings.account_number
        account_name = settings.account_name
        bin_number = settings.bin_number
        if not all([vietqr_url, account_number, account_name, bin_number]):
            frappe.throw(f"VietQR settings are not configured: {settings}")

        headers = {"Content-Type": "application/json"}
        payload = {
            "accountNo": account_number,
            "accountName": account_name,
            "acqId": bin_number,
            "amount": self.total_price,
            "addInfo": self.name,
            "format": "text",
            "template": "qr_only",
        }
        response = requests.post(vietqr_url, headers=headers, data=json.dumps(payload))
        if response.status_code == 200:
            try:
                response_json = response.json()
                if "data" in response_json and "qrDataURL" in response_json["data"]:
                    image_data = response_json["data"]["qrDataURL"]
                    # save the image to File and attach it to the Order
                    if image_data.startswith("data:"):
                        header, image_data = image_data.split(",", 1)
                    # fname, content, dt, dn, folder=None, decode=False, is_private=0, df=None
                    file_doc = save_file(
                        fname=f"{self.name}_qr_payment_code.png",
                        content=image_data,
                        dt=self.doctype,
                        dn=self.name,
                        decode=True,
                        is_private=0,
                        df="qr_payment_code",
                    )

                    self.qr_payment_code = file_doc.file_url
                else:
                    raise Exception("QR Payment Code not found in response")
            except Exception as e:
                # logger.error(json.dumps(payload))
                logger.error(response.json())
                logger.error(f"Exception: {e}")
                frappe.throw(f"Failed to generate QR Payment Code: {e}")
        else:
            logger.error(response)
            frappe.throw(f"Failed to generate QR Payment Code: {response}")

    def calculate_total_price(self):
        self.total_paid = 0
        self.total_price = 0
        self.total_payment_pending = 0
        for ticket in self.tickets:
            self.total_price += ticket.ticket_price
            if ticket.status == HRTicketStatus.PAID.value:
                self.total_paid += ticket.ticket_price
            elif ticket.status == HRTicketStatus.PENDING_PAYMENT.value:
                self.total_payment_pending += ticket.ticket_price

        if self.total_payment_pending == 0:
            self.status = HROrderStatus.PAID.value
        else:
            self.status = HROrderStatus.PENDING_PAYMENT.value

    def get_ticket_list_for_email(self):
        ticket_status_translation = {
            HRTicketStatus.PENDING_PAYMENT.value: "Chờ thanh toán",
            HRTicketStatus.PAID.value: "Đã thanh toán",
            HRTicketStatus.CANCELED.value: "Đã huỷ",
            HRTicketStatus.REFUNDED.value: "Đã hoàn tiền",
            HRTicketStatus.ATTENDED.value: "Đã tham gia",
        }
        ticket_list = []
        for ticket in self.tickets:
            ticket_list.append(
                {
                    "name": ticket.name,
                    "full_name": (
                        ticket.full_name
                        if not ticket.wellspring_code
                        else f"{ticket.full_name} ({ticket.wellspring_code})"
                    ),
                    "ticket_type": ticket.ticket_type,
                    "distance": ticket.distance,
                    "shirt_size": ticket.shirt_size,
                    "bib": ticket.bib,
                    "ticket_price": frappe.utils.fmt_money(
                        ticket.ticket_price, currency="VND", format="#.###", precision=0
                    ),
                    "status": ticket_status_translation.get(
                        ticket.status, ticket.status
                    ),
                }
            )
        return ticket_list

    def send_order_confirmation_email(self):
        sender = settings.email_sender
        subject = "WSSG Happy Run 2025 - Đăng ký thành công"
        recipients = [self.email]
        template = "hr_order_confirmation"
        qr_code_img_tag = f"""<img src="{self.qr_payment_code}" alt="QR Payment Code" style="width: 200px; height: 200px;"/>"""
        ticket_list = self.get_ticket_list_for_email()
        args = dict(
            total_payment_pending=frappe.utils.fmt_money(
                self.total_payment_pending, currency="VND", format="#.###", precision=0
            ),
            total_price=frappe.utils.fmt_money(
                self.total_price, currency="VND", format="#.###", precision=0
            ),
            total_paid=frappe.utils.fmt_money(
                self.total_paid, currency="VND", format="#.###", precision=0
            ),
            tickets=ticket_list,
            qr_code_img_tag=qr_code_img_tag,
        )
        send_confirmation_email(template, sender, recipients, subject, args)

    def send_payment_confirmation_email(self):
        """Send payment confirmation email after successful payment"""
        sender = settings.email_sender
        subject = "WSSG Happy Run 2025 - Xác nhận thanh toán"
        recipients = [self.email]
        template = "hr_payment_confirmation"
        ticket_list = self.get_ticket_list_for_email()
        ticket_list = [
            ticket for ticket in ticket_list if ticket["status"] == "Đã thanh toán"
        ]
        args = dict(
            total_payment_pending=frappe.utils.fmt_money(
                self.total_payment_pending, currency="VND", format="#.###", precision=0
            ),
            total_price=frappe.utils.fmt_money(
                self.total_price, currency="VND", format="#.###", precision=0
            ),
            total_paid=frappe.utils.fmt_money(
                self.total_paid, currency="VND", format="#.###", precision=0
            ),
            tickets=ticket_list,
        )
        send_confirmation_email(template, sender, recipients, subject, args)

    def send_cancellation_email(self):
        """Send cancellation email after cancelling the order"""
        sender = settings.email_sender
        subject = "WSSG Happy Run 2025 - Huỷ đăng ký thành công"
        recipients = [self.email]
        template = "hr_order_cancellation"
        ticket_list = self.get_ticket_list_for_email()
        args = dict(
            total_payment_pending=frappe.utils.fmt_money(
                self.total_payment_pending, currency="VND", format="#.###", precision=0
            ),
            total_price=frappe.utils.fmt_money(
                self.total_price, currency="VND", format="#.###", precision=0
            ),
            total_paid=frappe.utils.fmt_money(
                self.total_paid, currency="VND", format="#.###", precision=0
            ),
            tickets=ticket_list,
        )
        send_confirmation_email(template, sender, recipients, subject, args)


def send_confirmation_email(email_template, sender, recipients, subject, args):
    frappe.sendmail(
        sender=sender,
        recipients=recipients,
        subject=subject,
        template=email_template,
        args=args,
        header=_("WSSG Happy Run 2025"),
        now=True,
    )
