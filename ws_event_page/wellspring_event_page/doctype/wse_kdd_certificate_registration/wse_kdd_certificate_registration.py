# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEKDDCertificateRegistration(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		parent: DF.Data
		parent_email: DF.Data
		parent_full_name: DF.Data
		parent_phone_number: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		registration_datetime: DF.Datetime | None
	# end: auto-generated types
	pass
