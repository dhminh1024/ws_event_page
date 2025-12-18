# Copyright (c) 2025, Wellspring and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class WSEGSVote(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		device_fingerprint: DF.Data | None
		finalist: DF.Link
		fraud_reasons: DF.SmallText | None
		fraud_score: DF.Int
		gs_program: DF.Link
		ip_address: DF.Data | None
		is_suspicious: DF.Check
		is_valid: DF.Check
		referrer: DF.Data | None
		reviewed_at: DF.Datetime | None
		reviewed_by: DF.Link | None
		user_agent: DF.SmallText | None
		voted_at: DF.Datetime | None
		voter: DF.Link
		voter_email: DF.Data
		voter_name: DF.Data | None
	# end: auto-generated types
	"""WSE GS Vote - Track votes for Greatest Show 25."""

	def before_insert(self):
		"""Set audit fields before insert."""
		# Set voted_at timestamp
		if not self.voted_at:
			self.voted_at = frappe.utils.now_datetime()

		# Set IP address
		if hasattr(frappe.local, "request_ip"):
			self.ip_address = frappe.local.request_ip

		# Set user agent
		if hasattr(frappe, "request") and hasattr(frappe.request, "headers"):
			self.user_agent = frappe.request.headers.get("User-Agent", "")
			self.referrer = frappe.request.headers.get("Referer", "")  # Note: HTTP header is "Referer" (misspelled)

		# Set default fraud detection values if not set
		if not hasattr(self, "is_valid") or self.is_valid is None:
			self.is_valid = 1
		if not hasattr(self, "is_suspicious") or self.is_suspicious is None:
			self.is_suspicious = 0
		if not hasattr(self, "fraud_score") or self.fraud_score is None:
			self.fraud_score = 0

	def validate(self):
		"""Validate vote before saving."""
		# Get voter email from WSE GS Users
		if self.voter:
			voter_doc = frappe.get_doc("WSE GS Users", self.voter)
			self.voter_email = voter_doc.email
			self.voter_name = voter_doc.full_name

		# Check for duplicate votes (one vote per program per user - any finalist)
		if not self.is_new():
			return  # Skip validation on update

		existing_vote = frappe.db.exists(
			{
				"doctype": "WSE GS Vote",
				"gs_program": self.gs_program,
				"voter": self.voter,
				"is_valid": 1,  # Only count valid votes
				"name": ["!=", self.name],
			}
		)

		if existing_vote:
			frappe.throw(
				"Bạn đã bình chọn rồi. Mỗi người chỉ được bình chọn 1 tiết mục duy nhất | You have already voted. Each user can only vote for one finalist.",
				frappe.DuplicateEntryError,
			)

	def on_submit(self):
		"""Update vote count on finalist after submission."""
		pass  # We'll use atomic SQL update in API instead

	def on_cancel(self):
		"""Decrement vote count on cancel."""
		pass  # We'll use atomic SQL update in API instead
