# Copyright (c) 2025, Wellspring and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class WSEGSFinalist(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		display_order: DF.Int
		entry_category: DF.Literal["Singing", "Dancing", "Instrumental", "Other"]
		entry_group: DF.Literal["Group A", "Group B", "Group C"]
		finalist_name: DF.Data
		gs_program: DF.Link
		is_active: DF.Check
		thumbnail: DF.AttachImage | None
		video_url: DF.Data | None
		vote_count: DF.Int
	# end: auto-generated types
	"""WSE GS Finalist - Tiết mục chung kết Greatest Show 25."""

	def validate(self):
		"""Validate finalist data."""
		# Validate video URL format if provided
		if self.video_url:
			self.video_url = self.video_url.strip()

		# Validate is active with program
		if self.is_active and self.gs_program:
			# Check if program is current/active
			pass

	def recalculate_vote_count(self):
		"""Recalculate vote count from all valid, non-cancelled votes."""
		vote_count = frappe.db.count(
			"WSE GS Vote",
			filters={
				"finalist": self.name,
				"is_valid": 1,
				"is_cancelled": 0,
			},
		)
		self.db_set("vote_count", vote_count, update_modified=False)
		return vote_count


@frappe.whitelist()
def recalculate_vote_count(finalist_id):
	"""API method to recalculate vote count for a finalist."""
	finalist = frappe.get_doc("WSE GS Finalist", finalist_id)
	new_count = finalist.recalculate_vote_count()
	return {"vote_count": new_count}
