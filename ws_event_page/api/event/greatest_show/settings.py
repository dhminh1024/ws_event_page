import frappe


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_greatest_show_settings():
	"""Get WSE GS Settings."""
	settings = frappe.get_single("WSE GS Settings")
	return settings.as_dict()
