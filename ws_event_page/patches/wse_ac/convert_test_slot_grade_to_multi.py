# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

"""
Patch to convert WSE AC Test Slot student_grade field from Select to Small Text.

This allows test slots to serve multiple grades via comma-separated values.
Existing single-grade values will continue to work without modification.
"""

import frappe


def execute():
    """Reload the doctype to apply the field type change."""
    frappe.reload_doc("wellspring_event_page", "doctype", "wse_ac_test_slot")
    frappe.db.commit()
