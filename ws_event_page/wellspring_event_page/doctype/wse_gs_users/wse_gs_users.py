# Copyright (c) 2025, Wellspring and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class WSEGSUsers(Document):
	"""WSE GS Users - Lightweight voter tracking for Greatest Show 25."""

	def before_insert(self):
		"""Set first_login timestamp on creation."""
		if not self.first_login:
			self.first_login = frappe.utils.now_datetime()

	def validate(self):
		"""Validate email and Facebook user ID uniqueness."""
		# Email uniqueness is handled by unique constraint in DocType
		# Facebook user ID uniqueness is also handled by unique constraint
		pass
