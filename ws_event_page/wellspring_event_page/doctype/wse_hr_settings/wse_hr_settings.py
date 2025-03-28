# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEHRSettings(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		account_name: DF.Data
		account_number: DF.Data
		bank_name: DF.Data
		bank_short_name: DF.Data
		bin_number: DF.Data
		email_sender: DF.Data
		happy_run_ticket_price: DF.Currency
		limit_ticket_count: DF.Int
		reminder_email_attached_file_en: DF.Attach | None
		reminder_email_attached_file_vn: DF.Attach | None
		vietqr_url: DF.Data
		wellbeing_ticket_price: DF.Currency
	# end: auto-generated types
	pass
