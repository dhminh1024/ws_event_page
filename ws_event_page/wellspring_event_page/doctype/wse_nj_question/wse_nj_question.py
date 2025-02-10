# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSENJQuestion(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		description_en: DF.SmallText | None
		description_vn: DF.SmallText | None
		event: DF.Link
		sequence_number: DF.Data
		title_en: DF.Data
		title_vn: DF.Data
	# end: auto-generated types
	pass
