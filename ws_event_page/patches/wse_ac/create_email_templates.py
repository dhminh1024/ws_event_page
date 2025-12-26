# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

"""
Migration patch to create WSE AC email templates from HTML files.

This patch checks if Email Template documents exist for WSE AC module.
If not, it creates them from the templates in templates/emails/ac_*.html,
wrapping them in the newsletter template format.
After creating templates, it updates WSE AC Settings with the template references.
"""

import frappe
import os


# Mapping of HTML file names to Email Template names, subjects, and settings fields
EMAIL_TEMPLATES = {
    "ac_confirmation_email": {
        "name": "WSE AC Confirmation Email",
        "subject": "WSSG - Xác nhận đăng ký tham dự sự kiện | Event Registration Confirmation",
        "settings_field": "confirmation_email_template",
    },
    "ac_ds1_pass_confirmation": {
        "name": "WSE AC DS1 Pass Confirmation",
        "subject": "[WSSG] BÁO CÁO KẾT QUẢ KHẢO SÁT ĐẦU VÀO | THE STUDENT PLACEMENT TEST REPORT",
        "settings_field": "result_ds1_template",
    },
    "ac_ds2_pass_confirmation": {
        "name": "WSE AC DS2 Pass Confirmation",
        "subject": "[WSSG] BÁO CÁO KẾT QUẢ KHẢO SÁT ĐẦU VÀO | THE STUDENT PLACEMENT TEST REPORT",
        "settings_field": "result_ds2_template",
    },
    "ac_ds3_pass_confirmation": {
        "name": "WSE AC DS3 Pass Confirmation",
        "subject": "[WSSG] BÁO CÁO KẾT QUẢ KHẢO SÁT ĐẦU VÀO | THE STUDENT PLACEMENT TEST REPORT",
        "settings_field": "result_ds3_template",
    },
    "ac_ds4_fail_confirmation": {
        "name": "WSE AC DS4 Fail Confirmation",
        "subject": "[WSSG] BÁO CÁO KẾT QUẢ KHẢO SÁT ĐẦU VÀO | THE STUDENT PLACEMENT TEST REPORT",
        "settings_field": "result_ds4_template",
    },
    "ac_test_invitation_after_event": {
        "name": "WSE AC Test Invitation After Event",
        "subject": "[WSSG] THƯ MỜI ĐĂNG KÝ KHẢO SÁT ĐẦU VÀO | INVITATION TO REGISTER FOR THE PLACEMENT TEST",
        "settings_field": "test_invitation_after_event_template",
    },
    "ac_test_invitation_general": {
        "name": "WSE AC Test Invitation General",
        "subject": "[WSSG] THƯ MỜI ĐĂNG KÝ KHẢO SÁT ĐẦU VÀO | INVITATION TO REGISTER FOR THE PLACEMENT TEST",
        "settings_field": "test_invitation_general_template",
    },
    "ac_test_registration_confirmation": {
        "name": "WSE AC Test Registration Confirmation",
        "subject": "[WSSG] XÁC NHẬN LỊCH KHẢO SÁT ĐẦU VÀO | CONFIRMATION OF THE PLACEMENT TEST SCHEDULE",
        "settings_field": "test_registration_confirmation_template",
    },
}

TEMPLATE_WRAPPER_START = '{% extends "templates/emails/ws_newsletter_template.html" %} {% block content %}\n'
TEMPLATE_WRAPPER_END = "\n{% endblock %}"


def execute():
    """Create WSE AC email templates if they don't exist and update settings."""
    templates_dir = frappe.get_app_path("ws_event_page", "templates", "emails")

    # Track created/existing templates to update settings
    templates_to_set = {}

    for file_base, template_info in EMAIL_TEMPLATES.items():
        template_name = template_info["name"]
        default_subject = template_info["subject"]
        settings_field = template_info["settings_field"]

        # Check if template already exists
        if frappe.db.exists("Email Template", template_name):
            frappe.log(f"Email Template '{template_name}' already exists.")
            templates_to_set[settings_field] = template_name
            continue

        # Read the HTML file
        html_file = os.path.join(templates_dir, f"{file_base}.html")
        if not os.path.exists(html_file):
            frappe.log(f"HTML file '{html_file}' not found, skipping.")
            continue

        with open(html_file, "r", encoding="utf-8") as f:
            html_content = f.read()

        # Wrap the content in the newsletter template
        wrapped_content = TEMPLATE_WRAPPER_START + html_content + TEMPLATE_WRAPPER_END

        # Create the Email Template
        email_template = frappe.get_doc({
            "doctype": "Email Template",
            "name": template_name,
            "subject": default_subject,
            "response_html": wrapped_content,
            "use_html": 1,
        })
        email_template.insert(ignore_permissions=True)
        frappe.log(f"Created Email Template '{template_name}'.")
        templates_to_set[settings_field] = template_name

    # Update WSE AC Settings with the email templates
    if templates_to_set:
        settings = frappe.get_single("WSE AC Settings")
        for field, template_name in templates_to_set.items():
            if not getattr(settings, field, None):
                setattr(settings, field, template_name)
        settings.save(ignore_permissions=True)
        frappe.log("Updated WSE AC Settings with email templates.")

    frappe.db.commit()
