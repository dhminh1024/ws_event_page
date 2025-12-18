# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def get_list_of_events(kindergarten=None, registration_open=None):
    """Get list of kindergarten visit events.

    Args:
        kindergarten (str, optional): Filter by kindergarten name
        registration_open (str, optional): Filter by registration status ("1" or "0")

    Returns:
        dict: Response containing list of events
    """
    try:
        # Build filters
        filters = {}

        if kindergarten:
            filters["kindergarten"] = kindergarten

        if registration_open is not None:
            # Convert string to int for filter
            filters["registration_open"] = 1 if str(registration_open) == "1" else 0

        # Get events
        events = frappe.get_all(
            "WSE KDD Visit Event",
            filters=filters,
            fields=[
                "name",
                "title",
                "event_datetime",
                "kindergarten",
                "registration_open",
                "registration_link",
                "group_photo",
            ],
            order_by="event_datetime desc",
        )

        # Enrich with kindergarten details
        for event in events:
            if event.get("kindergarten"):
                kg = frappe.get_doc("WSE KDD Kindergarten", event["kindergarten"])
                event["kindergarten_title"] = kg.title
                event["kindergarten_logo"] = kg.logo

            # Add registration count
            event["registration_count"] = frappe.db.count(
                "WSE KDD Student Registration", filters={"visit_event": event["name"]}
            )

        return {
            "success": True,
            "data": events,
            "message": _("Events retrieved successfully"),
        }

    except Exception as e:
        frappe.log_error(message=str(e), title="KDD Get Events Error")
        return {
            "success": False,
            "message": _("Failed to retrieve events: {0}").format(str(e)),
        }


@frappe.whitelist(allow_guest=True)
def get_event_details(event_name):
    """Get detailed information about a specific visit event.

    Args:
        event_name (str): Name of the visit event

    Returns:
        dict: Response containing event details
    """
    try:
        if not event_name:
            return {"success": False, "message": _("Event name is required")}

        # Check if event exists
        if not frappe.db.exists("WSE KDD Visit Event", event_name):
            return {"success": False, "message": _("Event not found")}

        # Get event details
        event = frappe.get_doc("WSE KDD Visit Event", event_name)

        # Get kindergarten details
        kindergarten_data = None
        if event.kindergarten:
            kg = frappe.get_doc("WSE KDD Kindergarten", event.kindergarten)
            kindergarten_data = {
                "name": kg.name,
                "title": kg.title,
                "logo": kg.logo,
                "kindergarten_code": kg.kindergarten_code,
                "contact_person": kg.contact_person,
                "contact_email": kg.contact_email,
                "contact_phone": kg.contact_phone,
            }

        # Get registered students list
        registered_students = frappe.get_all(
            "WSE KDD Student Registration",
            filters={"visit_event": event_name},
            fields=["name", "student_full_name", "student_dob", "certificate_url"],
            order_by="creation desc",
        )

        # Build response
        event_data = {
            "name": event.name,
            "title": event.title,
            "event_datetime": event.event_datetime,
            "kindergarten": event.kindergarten,
            "kindergarten_data": kindergarten_data,
            "registration_open": event.registration_open,
            "registration_link": event.registration_link,
            "group_photo": event.group_photo,
            "registration_count": len(registered_students),
            "registered_students": registered_students,
        }

        return {
            "success": True,
            "data": event_data,
            "message": _("Event details retrieved successfully"),
        }

    except Exception as e:
        frappe.log_error(message=str(e), title="KDD Get Event Details Error")
        return {
            "success": False,
            "message": _("Failed to retrieve event details: {0}").format(str(e)),
        }
