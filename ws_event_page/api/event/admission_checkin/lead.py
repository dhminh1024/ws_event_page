import frappe
from ws_event_page.wellspring_event_page.doctype.wse_ac_lead.wse_ac_lead import (
    WSEACLeadStatus,
    WSEACTestStatus,
    WSEACErrorCode,
)
from enum import Enum


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
    # validate booking id
    try:
        lead = frappe.get_doc("WSE AC Lead", {"booking_id": booking_id})
    except Exception:
        frappe.throw(WSEACErrorCode.INVALID_BOOKING_ID.value)

    test_slots = frappe.get_all(
        "WSE AC Test Slot",
        filters={"is_enabled": 1},
        fields="*",
        order_by="date, start_time",
    )

    return test_slots


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_ac_settings():
    settings = frappe.get_single("WSE AC Settings")
    return settings.as_dict()
