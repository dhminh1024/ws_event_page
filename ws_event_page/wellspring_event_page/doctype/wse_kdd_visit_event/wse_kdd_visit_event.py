# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WSEKDDVisitEvent(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        event_datetime: DF.Datetime
        group_photo: DF.AttachImage | None
        kindergarten: DF.Link
        registration_link: DF.Data | None
        registration_open: DF.Check
        title: DF.Data
    # end: auto-generated types

    def autoname(self):
        """Set the name of the document to the title and event date-time.
        Format: KDD_EVENT_{date}
        """
        from frappe.utils import formatdate

        date_str = formatdate(self.event_datetime, "YYYYMMDD")
        self.name = f"KDD_EVENT_{date_str}_{self.title.replace(' ', '_')}"
