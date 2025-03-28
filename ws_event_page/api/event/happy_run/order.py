import frappe
from ws_event_page.wellspring_event_page.doctype.wse_hr_ticket.wse_hr_ticket import (
    HRTicketStatus,
)
from ws_event_page.wellspring_event_page.doctype.wse_hr_order.wse_hr_order import (
    HROrderStatus,
)


@frappe.whitelist()
def confirm_payment(order_id):
    order = frappe.get_doc("WSE HR Order", order_id)
    if order.status != HROrderStatus.PENDING_PAYMENT.value:
        frappe.throw("Order is not pending payment")
    order.status = HROrderStatus.PAID.value
    for ticket in order.tickets:
        if ticket.status == HROrderStatus.PENDING_PAYMENT.value:
            ticket.status = HRTicketStatus.PAID.value
    order.save()
    order.send_payment_confirmation_email()

    return order


@frappe.whitelist()
def resend_order_confirmation_email(order_id):
    order = frappe.get_doc("WSE HR Order", order_id)

    if order.status != HROrderStatus.PENDING_PAYMENT.value:
        frappe.throw("Order is not pending payment")

    order.send_order_confirmation_email()

    return order


@frappe.whitelist()
def cancel_order(order_id):
    order = frappe.get_doc("WSE HR Order", order_id)
    if order.status == HROrderStatus.CANCELED.value:
        frappe.throw("Order is already canceled")
    if order.status == HROrderStatus.PAID.value:
        frappe.throw("Order is already paid")

    order.status = HROrderStatus.CANCELED.value
    for ticket in order.tickets:
        if ticket.status == HRTicketStatus.PENDING_PAYMENT.value:
            ticket.status = HRTicketStatus.CANCELED.value
        elif ticket.status == HRTicketStatus.PAID.value:
            frappe.throw("Cannot cancel order with paid ticket")

    order.save()
    order.send_cancellation_email()

    return order


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_order_detail(order_id):
    order = frappe.get_doc("WSE HR Order", order_id)
    return order.as_dict()


@frappe.whitelist(methods=["POST"])
def send_runner_kit_notice_emails(order_ids_str):
    order_ids = order_ids_str.split(",")
    count = 0
    for order_id in order_ids:
        order = frappe.get_doc("WSE HR Order", order_id)
        if order.status == HROrderStatus.PAID.value:
            order.send_runner_kit_notice_email()
            count += 1

    return {
        "message": f"{count} email(s) đã được đưa vào danh sách gửi",
        "count": count,
    }


@frappe.whitelist(methods=["POST"])
def send_reminder_emails(order_ids_str):
    order_ids = order_ids_str.split(",")
    count = 0
    for order_id in order_ids:
        order = frappe.get_doc("WSE HR Order", order_id)
        if order.status == HROrderStatus.PAID.value:
            order.send_reminder_email()
            count += 1

    return {
        "message": f"{count} email(s) đã được đưa vào danh sách gửi",
        "count": count,
    }
