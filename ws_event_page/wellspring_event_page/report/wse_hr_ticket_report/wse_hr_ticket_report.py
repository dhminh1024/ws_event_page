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
    chart = get_chart(data)

    return columns, data, None, chart, report_summary


def get_columns():
    columns = [
        {
            "fieldname": "order_id",
            "fieldtype": "Link",
            "options": "WSE HR Order",
            "label": "Order ID",
            "width": 180,
        },
        {
            "fieldname": "order_contact_full_name",
            "fieldtype": "Data",
            "label": "Contact Full Name",
            "width": 180,
        },
        {
            "fieldname": "order_contact_email",
            "fieldtype": "Data",
            "label": "Contact Email",
            "width": 180,
        },
        {
            "fieldname": "order_mobile_number",
            "fieldtype": "Data",
            "label": "Contact Mobile Number",
            "width": 100,
        },
        {
            "fieldname": "ticket_id",
            "fieldtype": "Data",
            "label": "Ticket ID",
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
            "fieldname": "department",
            "fieldtype": "Data",
            "label": "Department",
            "width": 100,
        },
        {
            "fieldname": "school_class_title",
            "fieldtype": "Data",
            "label": "School Class",
            "width": 100,
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
            `tabWSE HR Order`.full_name AS order_contact_full_name,
            `tabWSE HR Order`.email AS order_contact_email,
            `tabWSE HR Order`.mobile_number AS order_mobile_number,
            `tabWSE HR Ticket`.status,
            `tabWSE HR Ticket`.category,
            `tabWSE HR Ticket`.full_name,
            `tabWSE HR Ticket`.wellspring_code,
            `tabWSE HR Ticket`.department AS department,
            `tabWSE HR Ticket`.school_class_title AS school_class_title,
            CONCAT(`tabWSE HR Ticket`.department, ' ', `tabWSE HR Ticket`.school_class_title) AS department_class,
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
            `tabWSE HR Order`.name, `tabWSE HR Ticket`.category DESC;
    """
    data = frappe.db.sql(query, as_dict=True)

    return data


def get_chart(data):
    # Chart to show number of tickets by school_class_title
    school_class_title = {}
    for d in data:
        if d.school_class_title and d.school_class_title not in school_class_title:
            school_class_title[d.school_class_title] = 1
        elif d.school_class_title:
            school_class_title[d.school_class_title] += 1

    chart = {
        "data": {
            "labels": list(school_class_title.keys()),
            "datasets": [
                {"name": "Tickets", "values": list(school_class_title.values())}
            ],
        },
        "type": "bar",
        "colors": [
            "#009682",
            "#f05023",
            "#002855",
            "#f5aa1e",
            "#006982",
        ],  # Custom colors
    }

    return chart


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
    total_ticket_25 = len([d for d in data if d.distance == "2.5 km"])
    total_ticket_50 = len([d for d in data if d.distance == "5 km"])

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
            "value": f"{total_ticket_25}/{total_ticket}",
            "label": "#2.5KM Tickets",
            "datatype": "Data",
            "indicator": "Blue",
        },
        {
            "value": f"{total_ticket_50}/{total_ticket}",
            "label": "#5KM Tickets",
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
