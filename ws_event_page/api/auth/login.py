import frappe


@frappe.whitelist(allow_guest=True)
def get_settings():
    return frappe.get_single("WSE Settings").as_dict()
