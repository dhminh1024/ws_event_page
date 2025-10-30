# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from ws_event_page.wellspring_event_page.doctype.wse_gs_registration.wse_gs_registration import (
    GSRegistrationStatus,
)


def execute(filters=None):
    columns, data = [], []

    columns = get_columns()
    data = get_data()
    report_summary = get_report_summary(data)
    chart = get_chart(data)

    return columns, data, None, chart, report_summary


def get_columns():
    """Define table columns for the report."""
    columns = [
        {
            "fieldname": "registration_id",
            "fieldtype": "Link",
            "options": "WSE GS Registration",
            "label": "Registration ID",
            "width": 160,
        },
        {
            "fieldname": "full_name",
            "fieldtype": "Data",
            "label": "Full Name",
            "width": 180,
        },
        {
            "fieldname": "email",
            "fieldtype": "Data",
            "label": "Email",
            "width": 200,
        },
        {
            "fieldname": "mobile_number",
            "fieldtype": "Data",
            "label": "Mobile Number",
            "width": 120,
        },
        {
            "fieldname": "entry_group",
            "fieldtype": "Data",
            "label": "Entry Group",
            "width": 140,
        },
        {
            "fieldname": "entry_name",
            "fieldtype": "Data",
            "label": "Entry Name",
            "width": 180,
        },
        {
            "fieldname": "entry_category",
            "fieldtype": "Data",
            "label": "Entry Category",
            "width": 120,
        },
        {
            "fieldname": "entry_participants",
            "fieldtype": "Text",
            "label": "Participants",
            "width": 200,
        },
        {
            "fieldname": "instrumental_info",
            "fieldtype": "Data",
            "label": "Instrumental Info",
            "width": 150,
        },
        {
            "fieldname": "talent_info",
            "fieldtype": "Data",
            "label": "Talent Info",
            "width": 150,
        },
        {
            "fieldname": "status",
            "fieldtype": "Data",
            "label": "Status",
            "width": 100,
        },
        {
            "fieldname": "program_title",
            "fieldtype": "Data",
            "label": "Program",
            "width": 150,
        },
        {
            "fieldname": "creation",
            "fieldtype": "Datetime",
            "label": "Registration Date",
            "width": 150,
        },
    ]
    return columns


def get_data():
    """Fetch registration data from database."""
    query = f"""
		SELECT
			`tabWSE GS Registration`.name AS registration_id,
			`tabWSE GS Registration`.full_name,
			`tabWSE GS Registration`.email,
			`tabWSE GS Registration`.mobile_number,
			`tabWSE GS Registration`.entry_group,
			`tabWSE GS Registration`.entry_name,
			`tabWSE GS Registration`.entry_category,
			`tabWSE GS Registration`.entry_participants,
			`tabWSE GS Registration`.instrumental_info,
			`tabWSE GS Registration`.talent_info,
			`tabWSE GS Registration`.status,
			`tabWSE GS Registration`.creation,
			`tabWSE GS Program`.title_en AS program_title
		FROM
			`tabWSE GS Registration`
			LEFT JOIN `tabWSE GS Program` ON `tabWSE GS Registration`.gs_program = `tabWSE GS Program`.name
		WHERE
			`tabWSE GS Registration`.status != "{GSRegistrationStatus.CANCELLED.value}"
		ORDER BY
			`tabWSE GS Registration`.creation DESC;
	"""
    data = frappe.db.sql(query, as_dict=True)

    return data


def get_chart(data):
    """Create bar chart showing number of registrations by entry category."""
    # Count registrations by entry_category
    entry_category_count = {}
    for d in data:
        if d.entry_category:
            if d.entry_category not in entry_category_count:
                entry_category_count[d.entry_category] = 1
            else:
                entry_category_count[d.entry_category] += 1

    chart = {
        "data": {
            "labels": list(entry_category_count.keys()),
            "datasets": [
                {"name": "Registrations", "values": list(entry_category_count.values())}
            ],
        },
        "type": "bar",
        "colors": [
            "#FF6B6B",  # Red for Singing
            "#4ECDC4",  # Teal for Dancing
            "#FFE66D",  # Yellow for Instrumental
            "#A8E6CF",  # Green for Other
        ],
    }

    return chart


def get_report_summary(data):
    """Create summary cards showing counts by entry group."""
    total_registrations = len(data)

    # Count by entry_group
    primary_count = len([d for d in data if d.entry_group == "Primary students"])
    secondary_count = len([d for d in data if d.entry_group == "Secondary students"])
    adult_count = len([d for d in data if d.entry_group == "Adult"])

    # Count by status
    waiting_count = len(
        [d for d in data if d.status == GSRegistrationStatus.WAITING_FOR_APPROVAL.value]
    )
    approved_count = len(
        [d for d in data if d.status == GSRegistrationStatus.APPROVED.value]
    )

    return [
        {
            "value": total_registrations,
            "label": "Total Registrations",
            "datatype": "Int",
            "indicator": "Blue",
        },
        {
            "value": f"{primary_count}/{total_registrations}",
            "label": "Primary Students",
            "datatype": "Data",
            "indicator": "Green",
        },
        {
            "value": f"{secondary_count}/{total_registrations}",
            "label": "Secondary Students",
            "datatype": "Data",
            "indicator": "Orange",
        },
        {
            "value": f"{adult_count}/{total_registrations}",
            "label": "Adults",
            "datatype": "Data",
            "indicator": "Purple",
        },
        {
            "value": waiting_count,
            "label": "Waiting Approval",
            "datatype": "Int",
            "indicator": "Yellow",
        },
        {
            "value": approved_count,
            "label": "Approved",
            "datatype": "Int",
            "indicator": "Green",
        },
    ]
