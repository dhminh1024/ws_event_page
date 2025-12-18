# Copyright (c) 2025, Wellspring and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class WSEGSVotingSettings(Document):
	"""WSE GS Voting Settings - Admin configuration for voting system."""

	def validate(self):
		"""Validate voting period settings."""
		# Validate start/end datetime if voting is enabled
		if self.voting_enabled:
			if self.voting_start_datetime and self.voting_end_datetime:
				if self.voting_end_datetime <= self.voting_start_datetime:
					frappe.throw(
						"Thời gian kết thúc phải sau thời gian bắt đầu | "
						"End datetime must be after start datetime"
					)

	@staticmethod
	def is_voting_open():
		"""Check if voting is currently open based on settings."""
		from frappe.utils import now_datetime, get_datetime

		settings = frappe.get_single("WSE GS Voting Settings")

		if not settings.voting_enabled:
			return False

		now = now_datetime()

		# Check start datetime
		if settings.voting_start_datetime:
			if now < get_datetime(settings.voting_start_datetime):
				return False

		# Check end datetime
		if settings.voting_end_datetime:
			if now > get_datetime(settings.voting_end_datetime):
				return False

		return True
