# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEGSRegistration(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		attach_file: DF.Attach | None
		email: DF.Data
		entry_category: DF.Literal["Singing", "Dancing", "Instrumental", "Other"]
		entry_group: DF.Literal["Primary students", "Secondary students", "Adult"]
		entry_name: DF.Data
		entry_participants: DF.SmallText | None
		full_name: DF.Data
		instrumental_info: DF.Data | None
		mobile_number: DF.Data
		status: DF.Literal["Approved", "Waitting"]
		talent_info: DF.Data | None
	# end: auto-generated types
	pass
