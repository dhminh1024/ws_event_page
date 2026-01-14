# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

"""
Number Card methods for WSE AC (Admission Check-in) module.
All methods filter by the current event from WSE AC Settings.
"""

import frappe


def _get_current_event():
    """
    Get the current event from WSE AC Settings.

    Returns:
        str | None: The current event name, or None if not set.
    """
    return frappe.db.get_single_value("WSE AC Settings", "current_event")


@frappe.whitelist()
def get_total_leads():
    """
    Get total count of leads in the current event.

    Used by Number Card: WSE AC Total Leads
    """
    current_event = _get_current_event()
    filters = {"ac_event": current_event} if current_event else {}
    return frappe.db.count("WSE AC Lead", filters)


@frappe.whitelist()
def get_confirmation_email_sent():
    """
    Get count of leads with status 'Confirmation Email Sent' in the current event.

    Used by Number Card: WSE AC Confirmation Email Sent
    """
    current_event = _get_current_event()
    filters = {"status": "Confirmation Email Sent"}
    if current_event:
        filters["ac_event"] = current_event
    return frappe.db.count("WSE AC Lead", filters)


@frappe.whitelist()
def get_lead_checked_in():
    """
    Get count of leads with status 'Checked in' in the current event.

    Used by Number Card: WSE AC Lead Checked In
    """
    current_event = _get_current_event()
    filters = {"status": "Checked in"}
    if current_event:
        filters["ac_event"] = current_event
    return frappe.db.count("WSE AC Lead", filters)


@frappe.whitelist()
def get_waiting_for_invitation():
    """
    Get count of leads with progress_status 'Waiting For Invitation' in the current event.

    Used by Number Card: WSE AC Test - Waiting for invitation
    """
    current_event = _get_current_event()
    filters = {"progress_status": "Waiting For Invitation"}
    if current_event:
        filters["ac_event"] = current_event
    return frappe.db.count("WSE AC Lead", filters)


@frappe.whitelist()
def get_invitation_email_sent():
    """
    Get count of leads with progress_status 'Invitation Email Sent' in the current event.

    Used by Number Card: WSE AC Test - Invitation Email Sent
    """
    current_event = _get_current_event()
    filters = {"progress_status": "Invitation Email Sent"}
    if current_event:
        filters["ac_event"] = current_event
    return frappe.db.count("WSE AC Lead", filters)


@frappe.whitelist()
def get_registered_for_test():
    """
    Get count of leads with progress_status 'Registered For Test' in the current event.

    Used by Number Card: WSE AC Test - Registered for test
    """
    current_event = _get_current_event()
    filters = {"progress_status": "Registered For Test"}
    if current_event:
        filters["ac_event"] = current_event
    return frappe.db.count("WSE AC Lead", filters)


@frappe.whitelist()
def get_checked_in_test():
    """
    Get count of leads with progress_status 'Checked In Test' in the current event.

    Used by Number Card: WSE AC Test - Checked in Test
    """
    current_event = _get_current_event()
    filters = {"progress_status": "Checked In Test"}
    if current_event:
        filters["ac_event"] = current_event
    return frappe.db.count("WSE AC Lead", filters)


@frappe.whitelist()
def get_event_invitation_sent():
    """
    Get count of leads with status 'Event Invitation Sent' in the current event.

    Used by Number Card: WSE AC Event - Invitation Sent
    """
    current_event = _get_current_event()
    filters = {"status": "Event Invitation Sent"}
    if current_event:
        filters["ac_event"] = current_event
    return frappe.db.count("WSE AC Lead", filters)


@frappe.whitelist()
def get_registered_for_event():
    """
    Get count of leads with status 'Registered for event' in the current event.

    Used by Number Card: WSE AC Event - Registered for Event
    """
    current_event = _get_current_event()
    filters = {"status": "Registered for event"}
    if current_event:
        filters["ac_event"] = current_event
    return frappe.db.count("WSE AC Lead", filters)
