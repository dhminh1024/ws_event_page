# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import formatdate, get_url


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
        date_str = formatdate(self.event_datetime, "YYYYMMDD")
        self.name = f"KDD_EVENT_{date_str}_{self.title.replace(' ', '_')}"

    def before_save(self):
        """Generate registration link before saving the document."""
        self.generate_registration_link()

    def validate(self):
        """Validate that group photo is uploaded if registration is open."""
        if self.registration_open and not self.group_photo:
            frappe.msgprint(
                msg="Group photo is required when registration is open. Certificate generation requires a group photo.",
                title="Missing Group Photo",
                indicator="orange",
            )

    def generate_registration_link(self):
        """Auto-generate the registration link based on the event name."""
        if self.name:
            base_url = get_url()
            # Remove trailing slash if present
            base_url = base_url.rstrip("/")
            # Generate the registration link
            self.registration_link = (
                f"{base_url}/events/kindergarten-demo-day?event={self.name}"
            )

    def get_registered_students(self):
        """Get list of registered students for this event.

        Returns:
            list: List of student registration documents
        """
        return frappe.get_all(
            "WSE KDD Student Registration",
            filters={"visit_event": self.name},
            fields=[
                "name",
                "student_full_name",
                "student_dob",
                "certificate_url",
                "kindergarten",
            ],
            order_by="creation desc",
        )

    def get_registration_count(self):
        """Get count of registered students for this event.

        Returns:
            int: Number of registered students
        """
        return frappe.db.count(
            "WSE KDD Student Registration", filters={"visit_event": self.name}
        )
