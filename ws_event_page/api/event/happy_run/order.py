import frappe


@frappe.whitelist()
def confirm_payment(order_id):
    order = frappe.get_doc("WSE HR Order", order_id)
    if order.status != "Pending Payment":
        frappe.throw("Order is not pending payment")
    order.status = "Paid"
    for ticket in order.tickets:
        if ticket.status == "Pending Payment":
            ticket.status = "Paid"
    order.save()
    order.send_payment_confirmation_email()

    return order


@frappe.whitelist()
def cancel_order(order_id):
    order = frappe.get_doc("WSE HR Order", order_id)
    if order.status == "Canceled":
        frappe.throw("Order is already canceled")
    order.status = "Canceled"
    for ticket in order.tickets:
        if ticket.status == "Pending Payment":
            ticket.status = "Canceled"
    order.save()
    order.send_cancellation_email()

    return order


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_order_detail(order_id):
    order = frappe.get_doc("WSE HR Order", order_id)
    return order.as_dict()
