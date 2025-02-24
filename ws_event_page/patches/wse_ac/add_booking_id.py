import frappe


def execute():
    frappe.reload_doc("wellspring_event_page", "doctype", "wse_ac_lead")
    leads = frappe.get_all("WSE AC Lead", fields=["name", "registration_number"])
    for lead in leads:
        lead_doc = frappe.get_doc("WSE AC Lead", lead.name)
        if not lead_doc.booking_id:
            lead_doc.generate_booking_id()
        lead_doc.save()
        frappe.db.commit()
