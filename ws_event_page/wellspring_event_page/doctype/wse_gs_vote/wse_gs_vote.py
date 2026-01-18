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
		is_cancelled: DF.Check
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

	def after_insert(self):
		"""Update vote count on finalist after insert."""
		self.update_finalist_vote_count(is_new_vote=True)

	def on_update(self):
		"""Update vote count when vote is modified (e.g., cancelled or validity changed)."""
		if self.has_value_changed("is_cancelled") or self.has_value_changed("is_valid"):
			self.update_finalist_vote_count()

	def on_trash(self):
		"""Update vote count when vote is deleted."""
		self.update_finalist_vote_count()

	def update_finalist_vote_count(self, is_new_vote=False):
		"""Recalculate and update vote count for the finalist.

		Args:
			is_new_vote: If True, also updates the last_voted_at timestamp.
		"""
		if not self.finalist:
			return

		# Count valid, non-cancelled votes for this finalist
		vote_count = frappe.db.count(
			"WSE GS Vote",
			filters={
				"finalist": self.finalist,
				"is_valid": 1,
				"is_cancelled": 0,
			}
		)

		# Update finalist vote count
		frappe.db.set_value("WSE GS Finalist", self.finalist, "vote_count", vote_count, update_modified=False)

		# Update last_voted_at timestamp only for new votes
		if is_new_vote:
			frappe.db.set_value(
				"WSE GS Finalist",
				self.finalist,
				"last_voted_at",
				frappe.utils.now_datetime(),
				update_modified=False
			)

		frappe.db.commit()
