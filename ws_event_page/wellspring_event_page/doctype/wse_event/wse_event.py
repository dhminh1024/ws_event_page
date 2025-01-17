# Copyright (c) 2024, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEEvent(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from ws_event_page.wellspring_event_page.doctype.wse_event_variable.wse_event_variable import WSEEventVariable

		description: DF.SmallText | None
		resource_ref: DF.JSON | None
		title: DF.Data
		url: DF.Data
		variables: DF.Table[WSEEventVariable]
	# end: auto-generated types
	pass
