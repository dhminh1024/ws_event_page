# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from ws_event_page.wellspring_event_page.doctype.wse_hr_ticket.wse_hr_ticket import (
    HRTicketStatus,
    HRTicketType,
)
from ws_event_page.wellspring_event_page.doctype.wse_hr_order.wse_hr_order import (
    HROrderStatus,
)


def execute(filters=None):
    columns, data = [], []

    columns = get_columns()
    data = get_data()
    report_summary = get_report_summary(data)

    return columns, data, None, None, report_summary


def get_columns():
    columns = [
        {
            "fieldname": "ticket_id",
            "fieldtype": "Data",
            "label": "Ticket ID",
            "width": 180,
        },
        {
            "fieldname": "order_id",
            "fieldtype": "Link",
            "options": "WSE HR Order",
            "label": "Order ID",
            "width": 180,
        },
        {
            "fieldname": "status",
            "fieldtype": "Data",
            "label": "Trạng Thái",
            "width": 100,
        },
        {"fieldname": "category", "fieldtype": "Data", "label": "Nhóm", "width": 100},
        {
            "fieldname": "full_name",
            "fieldtype": "Data",
            "label": "Họ Tên",
            "width": 200,
        },
        {
            "fieldname": "wellspring_code",
            "fieldtype": "Data",
            "label": "WSSG Code",
            "width": 120,
        },
        {
            "fieldname": "ticket_type",
            "fieldtype": "Data",
            "label": "Hạng Vé",
            "width": 100,
        },
        {"fieldname": "distance", "fieldtype": "Data", "label": "Cự ly", "width": 80},
        {
            "fieldname": "shirt_size",
            "fieldtype": "Data",
            "label": "Size Áo",
            "width": 70,
        },
        {
            "fieldname": "ticket_price",
            "fieldtype": "Currency",
            "label": "Giá Vé",
            "width": 100,
        },
        {"fieldname": "bib", "fieldtype": "Data", "label": "BIB", "width": 100},
    ]
    return columns


def get_data():
    query = f"""
        SELECT
            `tabWSE HR Ticket`.name AS ticket_id,
            `tabWSE HR Order`.name AS order_id,
            `tabWSE HR Ticket`.status,
            `tabWSE HR Ticket`.category,
            `tabWSE HR Ticket`.full_name,
            `tabWSE HR Ticket`.wellspring_code,
            `tabWSE HR Ticket`.ticket_type,
            `tabWSE HR Ticket`.distance,
            `tabWSE HR Ticket`.shirt_size,
            `tabWSE HR Ticket`.ticket_price,
            `tabWSE HR Ticket`.bib
        FROM
            `tabWSE HR Ticket`
            JOIN `tabWSE HR Order` ON `tabWSE HR Ticket`.parent = `tabWSE HR Order`.name
        WHERE
            `tabWSE HR Order`.status != "{HROrderStatus.CANCELED.value}"
        ORDER BY
            `tabWSE HR Order`.name, `tabWSE HR Ticket`.name;
    """
    data = frappe.db.sql(query, as_dict=True)

    return data


def get_report_summary(data):
    total_ticket = len(data)
    total_ticket_well_being = len(
        [d for d in data if d.ticket_type == HRTicketType.WELL_BEING.value]
    )
    total_ticket_happy_run = len(
        [d for d in data if d.ticket_type == HRTicketType.HAPPY_RUN.value]
    )

    total_ticket_price = sum([d.ticket_price for d in data])
    total_ticket_paid_price = sum(
        [d.ticket_price for d in data if d.status == HRTicketStatus.PAID.value]
    )
    total_ticket_pending_price = sum(
        [
            d.ticket_price
            for d in data
            if d.status == HRTicketStatus.PENDING_PAYMENT.value
        ]
    )

    return [
        {
            "value": f"{total_ticket_well_being}/{total_ticket}",
            "label": "#Well-being Tickets",
            "datatype": "Data",
            "indicator": "Blue",
        },
        {
            "value": f"{total_ticket_happy_run}/{total_ticket}",
            "label": "#Happy Run Tickets",
            "datatype": "Data",
            "indicator": "Blue",
        },
        {
            "value": total_ticket_price,
            "label": "Total Ticket Price",
            "datatype": "Currency",
            "indicator": "Blue",
        },
        {
            "value": total_ticket_paid_price,
            "label": "Total Paid Price",
            "datatype": "Currency",
            "indicator": "Green",
        },
        {
            "value": total_ticket_pending_price,
            "label": "Total Pending Price",
            "datatype": "Currency",
            "indicator": "Red",
        },
    ]
