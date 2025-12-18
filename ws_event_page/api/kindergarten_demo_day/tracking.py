# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils import now_datetime, get_datetime


@frappe.whitelist(allow_guest=True)
def track_page_visit(event_name, referrer=None, user_agent=None):
    """Track a page visit for an event.

    This hook is called when a user visits the event page to track analytics.

    Args:
        event_name (str): Name of the visit event (e.g., KDD_EVENT_202511329_Kidzone_1)
        referrer (str, optional): HTTP referrer URL
        user_agent (str, optional): User agent string

    Returns:
        dict: Response containing success status
    """
    try:
        # Validate event exists
        if not event_name:
            return {
                "success": False,
                "message": _("Event name is required")
            }

        if not frappe.db.exists("WSE KDD Visit Event", event_name):
            return {
                "success": False,
                "message": _("Event not found")
            }

        # Get client information
        ip_address = frappe.local.request_ip if hasattr(frappe.local, 'request_ip') else None

        # Create visit log (optional - you can create a separate DocType for this)
        # For now, we'll just increment a counter on the event
        event = frappe.get_doc("WSE KDD Visit Event", event_name)

        # Increment visit count (you may need to add this field to the DocType)
        current_count = event.get("page_visit_count") or 0
        event.db_set("page_visit_count", current_count + 1, update_modified=False)

        # Optionally log detailed visit information
        # You can create a separate DocType "WSE KDD Page Visit Log" for detailed tracking
        try:
            if frappe.db.exists("DocType", "WSE KDD Page Visit Log"):
                visit_log = frappe.get_doc({
                    "doctype": "WSE KDD Page Visit Log",
                    "visit_event": event_name,
                    "visit_datetime": now_datetime(),
                    "ip_address": ip_address,
                    "referrer": referrer,
                    "user_agent": user_agent
                })
                visit_log.insert(ignore_permissions=True)
        except Exception as log_error:
            # Don't fail the main tracking if logging fails
            frappe.log_error(
                message=str(log_error),
                title="KDD Page Visit Logging Error"
            )

        frappe.db.commit()

        return {
            "success": True,
            "message": _("Visit tracked successfully")
        }

    except Exception as e:
        frappe.log_error(message=str(e), title="KDD Track Page Visit Error")
        return {
            "success": False,
            "message": _("Failed to track visit")
        }


@frappe.whitelist(allow_guest=True)
def get_event_statistics(event_name):
    """Get statistics for an event.

    Args:
        event_name (str): Name of the visit event

    Returns:
        dict: Response containing event statistics
    """
    try:
        if not event_name:
            return {
                "success": False,
                "message": _("Event name is required")
            }

        if not frappe.db.exists("WSE KDD Visit Event", event_name):
            return {
                "success": False,
                "message": _("Event not found")
            }

        event = frappe.get_doc("WSE KDD Visit Event", event_name)

        # Get registration statistics
        total_registrations = frappe.db.count(
            "WSE KDD Student Registration",
            filters={"visit_event": event_name}
        )

        # Get certificate generation statistics
        certificates_generated = frappe.db.count(
            "WSE KDD Student Registration",
            filters={
                "visit_event": event_name,
                "certificate_generated": 1
            }
        )

        # Get average rating
        registrations_with_ratings = frappe.get_all(
            "WSE KDD Student Registration",
            filters={"visit_event": event_name},
            fields=["name"]
        )

        total_ratings = 0
        rating_count = 0

        for reg in registrations_with_ratings:
            reg_doc = frappe.get_doc("WSE KDD Student Registration", reg.name)
            for submission in reg_doc.certificate_registration_submission:
                if submission.rating:
                    total_ratings += submission.rating
                    rating_count += 1

        average_rating = round(total_ratings / rating_count, 2) if rating_count > 0 else 0

        # Get page visit count
        page_visits = event.get("page_visit_count") or 0

        return {
            "success": True,
            "data": {
                "event_name": event_name,
                "event_title": event.title,
                "page_visits": page_visits,
                "total_registrations": total_registrations,
                "certificates_generated": certificates_generated,
                "total_parent_submissions": rating_count,
                "average_rating": average_rating,
                "registration_open": event.registration_open
            },
            "message": _("Statistics retrieved successfully")
        }

    except Exception as e:
        frappe.log_error(message=str(e), title="KDD Get Event Statistics Error")
        return {
            "success": False,
            "message": _("Failed to retrieve statistics")
        }
