# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSENJSubmission(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from ws_event_page.wellspring_event_page.doctype.wse_nj_submission_image.wse_nj_submission_image import WSENJSubmissionImage

		current_class: DF.Data | None
		full_name: DF.Data | None
		images: DF.Table[WSENJSubmissionImage]
		student: DF.Link
		student_person: DF.Link | None
		wellspring_code: DF.Data
	# end: auto-generated types
	pass
