import frappe


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_happy_run_settings():
    settings = frappe.get_single("WSE HR Settings")
    return settings.as_dict()
