import frappe
from ws_event_page.wellspring_event_page.doctype.wse_ac_lead.wse_ac_lead import (
    WSEACLeadStatus,
    WSEACTestStatus,
    WSEACErrorCode,
    WSEACResultType,
)
from enum import Enum


def get_current_event():
    """
    Get the current active event from WSE AC Settings.

    Returns:
        Document: The current WSE AC Event document, or None if not set.
    """
    settings = frappe.get_single("WSE AC Settings")
    if not settings.current_event:
        return None
    return frappe.get_doc("WSE AC Event", settings.current_event)


@frappe.whitelist(methods=["POST"])
def send_result_confirmation_emails(lead_ids_str):
    lead_ids = lead_ids_str.split(",")
    count = 0
    for lead_id in lead_ids:
        lead = frappe.get_doc("WSE AC Lead", lead_id)
        if lead.result_type in [
            WSEACResultType.PASS_TYPE_1.value,
            WSEACResultType.PASS_TYPE_2.value,
            WSEACResultType.PASS_TYPE_3.value,
            WSEACResultType.FAIL_TYPE.value,
        ]:
            lead.send_result_confirmation_email()
            count += 1

    return {
        "message": f"{count} email(s) đã được đưa vào danh sách gửi",
        "count": count,
    }


@frappe.whitelist(methods=["POST"])
def send_confirmation_emails(lead_ids_str):
    lead_ids = lead_ids_str.split(",")
    count = 0
    for lead_id in lead_ids:
        lead = frappe.get_doc("WSE AC Lead", lead_id)
        if lead.status == WSEACLeadStatus.NEW.value:
            lead.send_confirmation_email()
            count += 1

    return {
        "message": f"{count} email(s) đã được đưa vào danh sách gửi",
        "count": count,
    }


@frappe.whitelist(methods=["POST"])
def send_test_invitation_emails(lead_ids_str):
    lead_ids = lead_ids_str.split(",")
    count = 0
    for lead_id in lead_ids:
        lead = frappe.get_doc("WSE AC Lead", lead_id)
        if lead.progress_status == WSEACTestStatus.WAITING_FOR_INVITATION.value:
            lead.send_test_invitation_email()
            count += 1

    return {
        "message": f"{count}/{len(lead_ids)} email(s) đã được đưa vào danh sách gửi",
        "count": count,
    }


@frappe.whitelist(methods=["GET"])
def get_lead_info(lead_id):
    try:
        lead = frappe.get_doc("WSE AC Lead", lead_id)
    except Exception:
        frappe.throw(WSEACErrorCode.INVALID_LEAD_ID.value)
    return lead.as_dict()


@frappe.whitelist(allow_guest=True, methods=["POST"])
def lead_checkin(lead_id):
    lead = frappe.get_doc("WSE AC Lead", lead_id)
    if lead.status in [
        WSEACLeadStatus.NEW.value,
        WSEACLeadStatus.CONFIRMATION_EMAIL_SENT.value,
    ]:
        lead.status = WSEACLeadStatus.CHECKED_IN.value
        lead.save()

    return lead.as_dict()


@frappe.whitelist(allow_guest=True, methods=["POST"])
def test_checkin(lead_id):
    lead = frappe.get_doc("WSE AC Lead", lead_id)
    if lead.progress_status in [
        WSEACTestStatus.WAITING_FOR_INVITATION.value,
        WSEACTestStatus.INVITATION_EMAIL_SENT.value,
        WSEACTestStatus.REGISTERED_FOR_TEST.value,
    ]:
        lead.progress_status = WSEACTestStatus.CHECKED_IN_TEST.value
        lead.test_checked_in_at = frappe.utils.now()
        lead.save()

    return lead.as_dict()


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_lead_by_booking_id(booking_id):
    try:
        lead = frappe.get_doc("WSE AC Lead", {"booking_id": booking_id})
    except Exception:
        frappe.throw(WSEACErrorCode.INVALID_BOOKING_ID.value)

    return lead.as_dict()


@frappe.whitelist(allow_guest=True, methods=["POST"])
def register_for_test(lead_id, test_slot_id, booking_id, switch_slot=0, send_email=1):
    lead = frappe.get_doc("WSE AC Lead", lead_id)

    if lead.booking_id != booking_id:
        frappe.throw(WSEACErrorCode.INVALID_BOOKING_ID.value)

    if lead.registered_slot:
        if not switch_slot:
            frappe.throw(WSEACErrorCode.ALREADY_REGISTERED.value)
        else:
            if lead.registered_slot == test_slot_id:
                frappe.throw(WSEACErrorCode.ALREADY_REGISTERED_FOR_SLOT.value)

            # User must have WSE AC Admin role to switch test slot
            # if "WSE AC Admin" not in frappe.get_roles():
            #     frappe.throw(WSEACErrorCode.PERMISSION_DENIED.value)
            # Comment out to allow switching test slot for all users

            prev_test_slot = frappe.get_doc("WSE AC Test Slot", lead.registered_slot)
            lead.register_for_test(test_slot_id, send_email)

            # recalculate current_registered for previous test slot
            prev_test_slot.calculate_current_registered()

    else:
        lead.register_for_test(test_slot_id)

    return lead.as_dict()


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_all_test_slots(booking_id):
    """
    Get all test slots for the lead's event or current event.
    """
    # Validate booking id
    try:
        lead = frappe.get_doc("WSE AC Lead", {"booking_id": booking_id})
    except Exception:
        frappe.throw(WSEACErrorCode.INVALID_BOOKING_ID.value)

    # Build filters based on event
    filters = {"is_enabled": 1}

    # Prefer lead's event, then current event
    if lead.ac_event:
        filters["ac_event"] = lead.ac_event
    else:
        event = get_current_event()
        if event:
            filters["ac_event"] = event.name

    test_slots = frappe.get_all(
        "WSE AC Test Slot",
        filters=filters,
        fields="*",
        order_by="date, start_time",
    )

    return test_slots


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_ac_settings():
    """
    Get current event settings for the frontend.
    Returns event settings if available, otherwise falls back to legacy settings.
    """
    event = get_current_event()

    if event:
        # Use event settings
        is_registration_closed = False
        current_time = frappe.utils.get_datetime(frappe.utils.now())

        if not event.open_test_registration:
            is_registration_closed = True
        elif event.test_registration_closing_time and (
            current_time > event.test_registration_closing_time
        ):
            is_registration_closed = True

        response = event.as_dict()
        response["is_registration_closed"] = is_registration_closed
        return response

    # Legacy fallback to settings
    settings = frappe.get_single("WSE AC Settings")
    is_registration_closed = False
    current_time = frappe.utils.get_datetime(frappe.utils.now())

    if not settings.open_test_registration:
        is_registration_closed = True
    elif settings.test_registration_closing_time and (
        current_time > settings.test_registration_closing_time
    ):
        is_registration_closed = True

    response = settings.as_dict()
    response["is_registration_closed"] = is_registration_closed
    return response
