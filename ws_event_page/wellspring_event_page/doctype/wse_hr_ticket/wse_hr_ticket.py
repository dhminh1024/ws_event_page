# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEHRTicket(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		bib: DF.Data
		category: DF.Literal["Primary", "Companion"]
		department: DF.Data | None
		distance: DF.Literal["2.5 km", "5 km"]
		email: DF.Data | None
		full_name: DF.Data | None
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		person_id: DF.Link | None
		school_class_title: DF.Data | None
		shirt_size: DF.Literal["Size 1", "Size 2", "Size 3", "Size 4", "Size 5", "Size 6", "Size 7"]
		status: DF.Literal["Pending Payment", "Canceled", "Paid", "Refunded", "Attended"]
		ticket_price: DF.Currency
		ticket_type: DF.Literal["Happy Run", "Well-being"]
		wellspring_code: DF.Data | None
	# end: auto-generated types
	pass
