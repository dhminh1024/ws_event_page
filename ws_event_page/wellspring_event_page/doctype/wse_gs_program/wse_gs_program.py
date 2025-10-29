# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import get_datetime


class WSEGSProgram(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		expired_datetime: DF.Datetime | None
		is_current: DF.Check
		is_expired: DF.Check
		is_opened: DF.Check
		opened_datetime: DF.Datetime | None
		program_code: DF.Data
		title_en: DF.Data
		title_vn: DF.Data
	# end: auto-generated types

	def validate(self):
		"""Validate that opened_datetime is before expired_datetime."""
		if self.opened_datetime and self.expired_datetime:
			if self.opened_datetime > self.expired_datetime:
				frappe.throw(_("The opened date must be before the expired date."))

	def after_save(self):
		"""
		After save hook to:
		1. Calculate and update is_opened and is_expired based on datetime
		2. Handle is_current changes and update WSE GS Settings
		"""
		self.update_open_expired_status()
		self.handle_current_program_change()

	def update_open_expired_status(self):
		"""Calculate and update is_opened and is_expired based on datetime fields."""
		current_datetime = get_datetime()

		# Calculate is_opened
		if not self.opened_datetime:
			is_opened = True
		else:
			is_opened = self.opened_datetime <= current_datetime

		# Calculate is_expired
		if not self.expired_datetime:
			is_expired = False
		else:
			is_expired = self.expired_datetime <= current_datetime

		# Update fields if they changed
		if self.is_opened != is_opened or self.is_expired != is_expired:
			frappe.db.set_value(
				"WSE GS Program",
				self.name,
				{
					"is_opened": is_opened,
					"is_expired": is_expired
				},
				update_modified=False
			)
			# Update instance values
			self.is_opened = is_opened
			self.is_expired = is_expired

	def handle_current_program_change(self):
		"""Handle is_current changes and update WSE GS Settings."""
		# Get current_program from settings
		current_program_in_settings = frappe.db.get_single_value(
			"WSE GS Settings", "current_program"
		)

		if self.is_current:
			# This program is marked as current
			# Update settings if it's not already set to this program
			if current_program_in_settings != self.name:
				# Uncheck is_current on the previous program if it exists
				if current_program_in_settings:
					frappe.db.set_value(
						"WSE GS Program",
						current_program_in_settings,
						"is_current",
						0,
						update_modified=False
					)

				# Update settings to point to this program
				frappe.db.set_single_value(
					"WSE GS Settings",
					"current_program",
					self.name
				)
		else:
			# This program is marked as not current
			# If it was the current program in settings, clear the settings
			if current_program_in_settings == self.name:
				frappe.db.set_single_value(
					"WSE GS Settings",
					"current_program",
					None
				)

	@staticmethod
	def get_current_gs_program():
		"""
		Get the current Greatest Show program from settings.
		Calculates is_opened and is_expired dynamically based on current datetime.

		Returns:
			WSEGSProgram: Current program document with calculated flags, or None if not set
		"""
		settings = frappe.get_single("WSE GS Settings")
		current_program_id = settings.current_program

		if not current_program_id:
			return None

		current_program = frappe.get_doc("WSE GS Program", current_program_id)
		current_datetime = get_datetime()

		# Calculate is_expired
		if not current_program.expired_datetime:
			current_program.is_expired = False
		else:
			current_program.is_expired = (
				current_program.expired_datetime <= current_datetime
			)

		# Calculate is_opened
		if not current_program.opened_datetime:
			current_program.is_opened = True
		else:
			current_program.is_opened = (
				current_program.opened_datetime <= current_datetime
			)

		return current_program
