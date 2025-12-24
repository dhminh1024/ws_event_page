"""
Migration patch to convert existing WSE AC data to event-based structure.

This patch:
1. Creates a default WSE AC Event from current settings
2. Assigns all existing leads to this event
3. Assigns all existing test slots to this event
4. Updates Settings to point to this event
"""

import frappe


def execute():
    """Execute the migration to event-based structure."""
    # Reload doctypes to ensure new fields are available
    frappe.reload_doc("wellspring_event_page", "doctype", "wse_ac_event")
    frappe.reload_doc("wellspring_event_page", "doctype", "wse_ac_settings")
    frappe.reload_doc("wellspring_event_page", "doctype", "wse_ac_lead")
    frappe.reload_doc("wellspring_event_page", "doctype", "wse_ac_test_slot")

    # Check if there are any leads or test slots to migrate
    lead_count = frappe.db.count("WSE AC Lead")
    slot_count = frappe.db.count("WSE AC Test Slot")

    if lead_count == 0 and slot_count == 0:
        print("No existing data to migrate. Skipping event creation.")
        return

    # Get current settings
    settings = frappe.get_single("WSE AC Settings")

    # Create default event with current settings values
    event = frappe.get_doc(
        {
            "doctype": "WSE AC Event",
            "title": "Admission Event Check-in 2024-2025",
            "school_year": "2024-2025",
            "is_active": 1,
            "open_test_registration": settings.get("open_test_registration", 1),
            "open_nhtn_event": settings.get("open_nhtn_event", 0),
            "test_registration_closing_time": settings.get(
                "test_registration_closing_time"
            ),
            "test_result_attachment": settings.get("test_result_attachment", 0),
        }
    )
    event.insert(ignore_permissions=True)
    print(f"Created default event: {event.name}")

    # Update all leads to link to this event
    if lead_count > 0:
        frappe.db.sql(
            """
            UPDATE `tabWSE AC Lead`
            SET ac_event = %s
            WHERE ac_event IS NULL OR ac_event = ''
        """,
            (event.name,),
        )
        print(f"Updated {lead_count} leads to link to event {event.name}")

    # Update all test slots to link to this event
    if slot_count > 0:
        frappe.db.sql(
            """
            UPDATE `tabWSE AC Test Slot`
            SET ac_event = %s
            WHERE ac_event IS NULL OR ac_event = ''
        """,
            (event.name,),
        )
        print(f"Updated {slot_count} test slots to link to event {event.name}")

    # Update settings to point to this event
    settings.current_event = event.name
    settings.save(ignore_permissions=True)
    print(f"Updated settings to point to event {event.name}")

    frappe.db.commit()
    print("Migration complete!")
