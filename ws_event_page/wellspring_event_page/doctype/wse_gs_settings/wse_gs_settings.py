# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEGSSettings(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		cancellation_email_template: DF.Link | None
		confirmation_email_template: DF.Link | None
		current_program: DF.Link | None
		email_sender: DF.Data | None
	# end: auto-generated types
	pass
