import frappe


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_current_program():
	"""
	Get the current Greatest Show program from settings.
	Returns program with calculated is_opened and is_expired status.
	"""
	from ws_event_page.wellspring_event_page.doctype.wse_gs_program.wse_gs_program import (
		WSEGSProgram,
	)

	current_program = WSEGSProgram.get_current_gs_program()

	if not current_program:
		return None

	return current_program.as_dict()
