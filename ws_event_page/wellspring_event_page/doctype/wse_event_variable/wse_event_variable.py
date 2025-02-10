# Copyright (c) 2024, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEEventVariable(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		image: DF.AttachImage | None
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		variable_name: DF.Data
		variable_type: DF.Literal["Text", "Image"]
		variable_value: DF.Text | None
	# end: auto-generated types
	pass
