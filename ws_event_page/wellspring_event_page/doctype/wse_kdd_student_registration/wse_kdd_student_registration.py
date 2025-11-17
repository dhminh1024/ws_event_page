# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEKDDStudentRegistration(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from ws_event_page.wellspring_event_page.doctype.wse_kdd_certificate_registration.wse_kdd_certificate_registration import WSEKDDCertificateRegistration

		certificate_generated: DF.Check
		certificate_registration_submission: DF.Table[WSEKDDCertificateRegistration]
		certificate_token: DF.Data | None
		certificate_url: DF.Data | None
		kindergarten: DF.Link | None
		student_dob: DF.Date | None
		student_full_name: DF.Data
		visit_event: DF.Link
	# end: auto-generated types
	pass
