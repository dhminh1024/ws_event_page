# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEACSettings(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		open_nhtn_event: DF.Check
		open_test_registration: DF.Check
		test_registration_closing_time: DF.Datetime | None
		test_result_attachment: DF.Check
	# end: auto-generated types
	pass
