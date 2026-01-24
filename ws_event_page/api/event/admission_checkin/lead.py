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
        if lead.status == WSEACLeadStatus.REGISTERED_FOR_EVENT.value:
            lead.send_confirmation_email()
            count += 1

    return {
        "message": f"{count} email(s) đã được đưa vào danh sách gửi",
        "count": count,
    }


@frappe.whitelist(methods=["POST"])
def send_event_invitation_emails(lead_ids_str):
    """Send event invitation emails to selected leads."""
    lead_ids = lead_ids_str.split(",")
    count = 0
    for lead_id in lead_ids:
        lead = frappe.get_doc("WSE AC Lead", lead_id)
        if lead.status == WSEACLeadStatus.NEW.value:
            lead.send_event_invitation_email()
            count += 1

    return {
        "message": f"{count}/{len(lead_ids)} email(s) have been queued for sending",
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
        WSEACLeadStatus.EVENT_INVITATION_SENT.value,
        WSEACLeadStatus.REGISTERED_FOR_EVENT.value,
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
    """
    Get lead by booking ID with event registration status.

    Returns:
        dict: Lead data including:
            - is_event_registration_closed (bool): Whether event registration is closed
            - event_registration_closing_time (str, optional): The closing time if set
    """
    try:
        lead = frappe.get_doc("WSE AC Lead", {"booking_id": booking_id})
    except Exception:
        frappe.throw(WSEACErrorCode.INVALID_BOOKING_ID.value)

    # Get event registration status
    is_event_registration_closed = False
    event_registration_closing_time = None

    event = None
    if lead.ac_event:
        event = frappe.get_doc("WSE AC Event", lead.ac_event)
    else:
        event = get_current_event()

    if event:
        event_registration_closing_time = event.event_registration_closing_time
        if not event.open_nhtn_event:
            is_event_registration_closed = True
        elif event.event_registration_closing_time:
            current_time = frappe.utils.get_datetime(frappe.utils.now())
            if current_time > event.event_registration_closing_time:
                is_event_registration_closed = True

    response = lead.as_dict()
    response["is_event_registration_closed"] = is_event_registration_closed
    response["event_registration_closing_time"] = event_registration_closing_time
    return response


@frappe.whitelist(allow_guest=True, methods=["POST"])
def register_for_event(booking_id):
    """Register a lead for the event using their booking ID."""
    try:
        lead = frappe.get_doc("WSE AC Lead", {"booking_id": booking_id})
    except Exception:
        frappe.throw(WSEACErrorCode.INVALID_BOOKING_ID.value)

    lead.register_for_event()
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

            # register_for_test() handles both incrementing new slot
            # and decrementing previous slot counts internally
            lead.register_for_test(test_slot_id, send_email)

    else:
        lead.register_for_test(test_slot_id, send_email)

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
def get_checkin_page_images():
    """
    Get all background images and event status flags for check-in pages.

    Returns:
        dict: Contains 'main', 'active', 'idle' image URLs,
              and 'open_nhtn_event', 'open_test_registration' status flags.
    """
    defaults = {
        "main": "/assets/ws_event_page/images/NHTN_BG_01.jpg",
        "active": "/assets/ws_event_page/images/NHTN_BG_02.jpg",
        "idle": "/assets/ws_event_page/images/NHTN_BG_01.jpg",
    }

    event = get_current_event()
    if event:
        return {
            "main": event.checkin_bg_main or defaults["main"],
            "active": event.checkin_bg_active or defaults["active"],
            "idle": event.checkin_bg_idle or defaults["idle"],
            "open_nhtn_event": event.open_nhtn_event,
            "open_test_registration": event.open_test_registration,
        }

    return {
        **defaults,
        "open_nhtn_event": False,
        "open_test_registration": False,
    }


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


@frappe.whitelist()
def preview_leads_for_sync(school_year, grade=None):
    """
    Preview leads from CRM Leads doctype for sync to WSE AC Lead.

    Args:
        school_year: School Year link value (e.g., "2025-2026")
        grade: Optional Educational Grade code (e.g., "G01")

    Returns:
        dict: Contains current_event info and list of leads to preview
    """
    # Get current AC event
    event = get_current_event()
    if not event:
        frappe.throw("No active WSE AC Event configured in settings")

    # Build filters for Leads query
    filters = {
        "school_year": school_year,
        "status": "Waiting Verification",
        "registernumber": ["is", "set"],
    }
    if grade:
        filters["registergrade"] = grade

    # Query leads with parent information
    leads = frappe.db.sql(
        """
        SELECT
            l.name as lead_name,
            l.studentfullname as student_full_name,
            l.registernumber as registration_number,
            l.registergrade as student_grade,
            l.genderid as gender_id,
            g.namevie as gender_name,
            (
                SELECT p.email
                FROM `tabParent Information Details` p
                WHERE p.parent = l.name
                    AND p.parenttype = 'Leads'
                    AND p.email IS NOT NULL
                    AND p.email != ''
                ORDER BY p.ismaincontact DESC, p.idx
                LIMIT 1
            ) as contact_email,
            (
                SELECT par.full_name
                FROM `tabParent Information Details` p
                JOIN `tabParent` par ON p.full_name = par.name
                WHERE p.parent = l.name
                    AND p.parenttype = 'Leads'
                    AND p.email IS NOT NULL
                    AND p.email != ''
                ORDER BY p.ismaincontact DESC, p.idx
                LIMIT 1
            ) as parent_full_name,
            (
                SELECT p.phone_number
                FROM `tabParent Information Details` p
                WHERE p.parent = l.name
                    AND p.parenttype = 'Leads'
                    AND p.email IS NOT NULL
                    AND p.email != ''
                ORDER BY p.ismaincontact DESC, p.idx
                LIMIT 1
            ) as mobile_number
        FROM `tabLeads` l
        LEFT JOIN `tabSMSGender` g ON l.genderid = g.name
        WHERE l.school_year = %(school_year)s
            AND l.status = 'Waiting Verification'
            AND l.registernumber IS NOT NULL
            AND l.registernumber != ''
            {grade_filter}
        ORDER BY l.registernumber
        """.format(
            grade_filter="AND l.registergrade = %(grade)s" if grade else ""
        ),
        {"school_year": school_year, "grade": grade},
        as_dict=True,
    )

    # Get existing WSE AC Lead registration numbers to mark duplicates
    existing_reg_numbers = set(
        frappe.get_all(
            "WSE AC Lead",
            filters={"ac_event": event.name},
            pluck="registration_number",
        )
    )

    # Process leads for preview
    preview_data = []
    for lead in leads:
        # Use Vietnamese gender name directly from CRM
        gender = lead.gender_name or ""

        # Check if already exists
        is_duplicate = lead.registration_number in existing_reg_numbers

        preview_data.append(
            {
                "lead_name": lead.lead_name,
                "ac_event": event.name,
                "ac_event_title": event.title,
                "student_full_name": lead.student_full_name,
                "registration_number": lead.registration_number,
                "student_grade": lead.student_grade,
                "student_gender": gender,
                "contact_email": lead.contact_email,
                "parent_full_name": lead.parent_full_name,
                "mobile_number": lead.mobile_number,
                "is_duplicate": is_duplicate,
            }
        )

    return {
        "event": {"name": event.name, "title": event.title},
        "leads": preview_data,
        "total": len(preview_data),
        "duplicates": sum(1 for l in preview_data if l["is_duplicate"]),
    }


@frappe.whitelist(methods=["POST"])
def sync_leads_to_ac(leads_json):
    """
    Create WSE AC Lead records from CRM Leads data.

    Args:
        leads_json: JSON string of leads to sync (from preview)

    Returns:
        dict: Summary of sync results (created, skipped, failed)
    """
    import json

    leads_data = json.loads(leads_json) if isinstance(leads_json, str) else leads_json

    # Get current AC event
    event = get_current_event()
    if not event:
        frappe.throw("No active WSE AC Event configured in settings")

    results = {"created": [], "skipped": [], "failed": []}

    for lead in leads_data:
        try:
            # Skip duplicates
            if lead.get("is_duplicate"):
                results["skipped"].append(
                    {
                        "registration_number": lead["registration_number"],
                        "reason": "Already exists",
                    }
                )
                continue

            # Skip if no email
            if not lead.get("contact_email"):
                results["skipped"].append(
                    {
                        "registration_number": lead["registration_number"],
                        "reason": "No parent email",
                    }
                )
                continue

            # Double-check for existing record
            if frappe.db.exists(
                "WSE AC Lead", {"registration_number": lead["registration_number"]}
            ):
                results["skipped"].append(
                    {
                        "registration_number": lead["registration_number"],
                        "reason": "Already exists",
                    }
                )
                continue

            # Create new WSE AC Lead
            ac_lead = frappe.get_doc(
                {
                    "doctype": "WSE AC Lead",
                    "ac_event": event.name,
                    "crm_lead_id": lead.get("lead_name"),
                    "registration_number": lead["registration_number"],
                    "student_full_name": lead["student_full_name"],
                    "student_grade": lead["student_grade"],
                    "student_gender": lead["student_gender"],
                    "contact_email": lead["contact_email"],
                    "parent_full_name": lead.get("parent_full_name"),
                    "mobile_number": lead.get("mobile_number"),
                    "status": "New",
                    "progress_status": "Waiting For Invitation",
                }
            )
            ac_lead.insert(ignore_permissions=True)

            results["created"].append(
                {
                    "registration_number": lead["registration_number"],
                    "name": ac_lead.name,
                }
            )

        except Exception as e:
            results["failed"].append(
                {
                    "registration_number": lead.get("registration_number", "Unknown"),
                    "error": str(e),
                }
            )

    frappe.db.commit()

    return {
        "created_count": len(results["created"]),
        "skipped_count": len(results["skipped"]),
        "failed_count": len(results["failed"]),
        "created": results["created"],
        "skipped": results["skipped"],
        "failed": results["failed"],
    }


@frappe.whitelist(methods=["POST"])
def cancel_test_registration(lead_id, booking_id):
    """
    Cancel a lead's test registration.
    Clears registered_slot, resets progress_status, clears test_registered_at.

    Args:
        lead_id: The WSE AC Lead document name.
        booking_id: The booking ID to verify the request.

    Returns:
        dict: Success message.
    """
    lead = frappe.get_doc("WSE AC Lead", lead_id)

    if lead.booking_id != booking_id:
        frappe.throw(WSEACErrorCode.INVALID_BOOKING_ID.value)

    if lead.progress_status != WSEACTestStatus.REGISTERED_FOR_TEST.value:
        frappe.throw("Lead is not registered for a test")

    # Store old slot for decrementing
    old_slot_id = lead.registered_slot

    # Clear registration fields
    lead.registered_slot = None
    lead.test_registered_at = None

    # Reset progress_status based on invitation_sent_at
    if lead.invitation_sent_at:
        lead.progress_status = WSEACTestStatus.INVITATION_EMAIL_SENT.value
    else:
        lead.progress_status = WSEACTestStatus.WAITING_FOR_INVITATION.value

    # Skip slot sync in before_save - we handle it here
    lead.flags.skip_slot_sync = True
    lead.save()

    # Decrement old slot count
    if old_slot_id:
        old_slot = frappe.get_doc("WSE AC Test Slot", old_slot_id)
        old_slot.calculate_current_registered(-1)

    return {"message": "Registration cancelled successfully"}


@frappe.whitelist(methods=["POST"])
def recalculate_test_slot_counts(slot_ids_str):
    """
    Recalculate current_registered for selected test slots from actual DB data.
    Fixes any count desync issues.

    Args:
        slot_ids_str: Comma-separated list of test slot IDs.

    Returns:
        dict: Summary of recalculation results.
    """
    if (
        "WSE AC Admin" not in frappe.get_roles()
        and "System Manager" not in frappe.get_roles()
    ):
        frappe.throw("Permission denied - Admin role required")

    slot_ids = slot_ids_str.split(",")
    fixed_count = 0

    for slot_name in slot_ids:
        slot = frappe.get_doc("WSE AC Test Slot", slot_name)
        old_count = slot.current_registered
        actual_count = frappe.db.count("WSE AC Lead", {"registered_slot": slot_name})

        if old_count != actual_count:
            slot.current_registered = actual_count
            slot.save()
            fixed_count += 1

    frappe.db.commit()
    return {
        "message": f"Recalculated {len(slot_ids)} slot(s), fixed {fixed_count} with wrong counts"
    }
