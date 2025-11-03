import frappe


def execute():
    """
    Migrate entry_group values from old format to new format:
    - "Primary students" -> "Group A"
    - "Secondary students" -> "Group B"
    - "Adult" -> "Group C"
    """
    # Reload the doctype to get the latest schema
    frappe.reload_doc("wellspring_event_page", "doctype", "wse_gs_registration")

    # Update all existing records
    frappe.db.sql("""
        UPDATE `tabWSE GS Registration`
        SET entry_group = CASE entry_group
            WHEN 'Primary students' THEN 'Group A'
            WHEN 'Secondary students' THEN 'Group B'
            WHEN 'Adult' THEN 'Group C'
            ELSE entry_group
        END
        WHERE entry_group IN ('Primary students', 'Secondary students', 'Adult')
    """)

    frappe.db.commit()

    # Log the changes
    count = frappe.db.count('WSE GS Registration')
    print(f"Migration completed: Updated entry_group values for {count} total registrations")
