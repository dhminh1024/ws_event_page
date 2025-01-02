# Copyright (c) 2024, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEHBChallenge(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		description_en: DF.SmallText
		description_vn: DF.SmallText
		happy_box_event: DF.Link
		number_of_submissions: DF.Int
		release_date: DF.Date
		sequence_number: DF.Int
		thumbnail: DF.AttachImage
		title_en: DF.Data
		title_vn: DF.Data
	# end: auto-generated types
	pass
