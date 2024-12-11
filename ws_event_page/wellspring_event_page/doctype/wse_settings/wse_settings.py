# Copyright (c) 2024, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSESettings(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		default_homepage_event: DF.Link | None
		default_homepage_url: DF.Data | None
	# end: auto-generated types
	pass
