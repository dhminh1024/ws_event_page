"""
Number Card methods for Kindergarten Demo Day workspace.

These custom methods provide counts based on opened Visit Events (registration_open = 1).
"""

import frappe


@frappe.whitelist()
def get_kindergartens_with_open_registration(filters=None):
    """
    Count unique kindergartens from Student Registrations where visit_event.registration_open = 1.

    Returns:
        dict: {"value": count} format required by Number Card
    """
    # Get all open visit events
    kindergartens = frappe.get_list(
        "WSE KDD Visit Event",
        filters=[["registration_open", "=", 1]],
        pluck="kindergarten",
    )

    if not kindergartens:
        return {"value": 0}

    # Filter out None/empty values and count
    unique_kindergartens = set(
        kg for kg in kindergartens if kg  # Exclude None or empty values
    )

    return {"value": len(unique_kindergartens)}


@frappe.whitelist()
def get_students_with_open_registration(filters=None):
    """
    Count Student Registrations where visit_event.registration_open = 1.

    Returns:
        dict: {"value": count} format required by Number Card
    """
    # Get all open visit events
    open_visit_events = frappe.get_list(
        "WSE KDD Visit Event", filters=[["registration_open", "=", 1]], pluck="name"
    )

    if not open_visit_events:
        return {"value": 0}

    # Count student registrations for open events
    count = frappe.db.count(
        "WSE KDD Student Registration",
        filters=[["visit_event", "in", open_visit_events]],
    )

    return {"value": count}


@frappe.whitelist()
def get_certificates_with_open_registration(filters=None):
    """
    Count Certificate Registration submissions (child table entries) for opened Visit Events.

    Returns:
        dict: {"value": count} format required by Number Card
    """
    # Get all open visit events
    open_visit_events = frappe.get_list(
        "WSE KDD Visit Event", filters=[["registration_open", "=", 1]], pluck="name"
    )

    if not open_visit_events:
        return {"value": 0}

    # Get all student registrations for open events
    student_registrations = frappe.get_list(
        "WSE KDD Student Registration",
        filters=[["visit_event", "in", open_visit_events]],
        pluck="name"
    )

    if not student_registrations:
        return {"value": 0}

    # Count certificate registration submissions (child table) for those students
    count = frappe.db.count(
        "WSE KDD Certificate Registration",
        filters=[["parent", "in", student_registrations]],
    )

    return {"value": count}
