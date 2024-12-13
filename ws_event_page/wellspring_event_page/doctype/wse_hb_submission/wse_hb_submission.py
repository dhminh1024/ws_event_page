# Copyright (c) 2024, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEHBSubmission(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		add_to_gallery: DF.Check
		full_name: DF.Data
		happy_box_challenge: DF.Link
		image: DF.AttachImage | None
		user_type: DF.Literal["Student", "Staff"]
		wellspring_code: DF.Data
	# end: auto-generated types
	pass
