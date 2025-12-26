# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class WSEACSettings(Document):
	"""
	Singleton DocType for managing WSE AC (Admission Check-in) global settings.
	Contains a reference to the current active event.
	"""

	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		bank_account_name: DF.Data | None
		bank_account_number: DF.Data | None
		bank_bin_number: DF.Data | None
		bank_name: DF.Data | None
		bank_short_name: DF.Data | None
		confirmation_email_template: DF.Link | None
		current_event: DF.Link | None
		payment_amount: DF.Currency
		payment_info_template: DF.Data | None
		result_ds1_template: DF.Link | None
		result_ds2_template: DF.Link | None
		result_ds3_template: DF.Link | None
		result_ds4_template: DF.Link | None
		test_invitation_after_event_template: DF.Link | None
		test_invitation_general_template: DF.Link | None
		test_registration_confirmation_template: DF.Link | None
	# end: auto-generated types

	def on_update(self):
		"""Sync is_active flag when current_event changes."""
		self._sync_active_event()

	def _sync_active_event(self):
		"""
		Synchronize the is_active field across all AC events.
		Ensures only the event selected in current_event has is_active=1,
		while all other events have is_active=0.
		"""
		if not self.current_event:
			return

		# Deactivate all events first
		frappe.db.set_value(
			"WSE AC Event",
			{"name": ("!=", self.current_event)},
			"is_active",
			0,
			update_modified=False,
		)

		# Activate the selected event
		frappe.db.set_value(
			"WSE AC Event",
			self.current_event,
			"is_active",
			1,
			update_modified=False,
		)

		frappe.db.commit()
