# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEKDDKindergarten(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		contact_email: DF.Data | None
		contact_person: DF.Data | None
		contact_phone: DF.Data | None
		kindergarten_code: DF.Data
		logo: DF.AttachImage | None
		title: DF.Data
	# end: auto-generated types
	pass
