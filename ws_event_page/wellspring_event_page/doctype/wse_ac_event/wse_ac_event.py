# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class WSEACEvent(Document):
    """
    DocType for managing WSE AC (Admission Check-in) events.
    Each event contains its own settings and links to leads and test slots.
    """

    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        expired_date: DF.Datetime | None
        is_active: DF.Check
        open_nhtn_event: DF.Check
        open_test_registration: DF.Check
        school_year: DF.Data | None
        test_registration_closing_time: DF.Datetime | None
        test_result_attachment: DF.Check
        title: DF.Data
    # end: auto-generated types

    def on_update(self):
        """
        When this event is directly set as active, ensure other events are deactivated.
        This is a fallback in case someone edits is_active directly.
        """
        if self.is_active:
            self._ensure_single_active()

    def _ensure_single_active(self):
        """Ensure only this event is marked as active."""
        frappe.db.set_value(
            "WSE AC Event",
            {"name": ("!=", self.name)},
            "is_active",
            0,
            update_modified=False,
        )

    @staticmethod
    def get_current_event():
        """
        Get the current active event from WSE AC Settings.

        Returns:
            Document: The current WSE AC Event document, or None if not set.
        """
        settings = frappe.get_single("WSE AC Settings")
        if not settings.current_event:
            return None
        return frappe.get_doc("WSE AC Event", settings.current_event)

    def is_registration_open(self):
        """
        Check if test registration is open for this event.

        Returns:
            bool: True if registration is open, False otherwise.
        """
        if not self.open_test_registration:
            return False

        if self.test_registration_closing_time:
            current_time = frappe.utils.get_datetime(frappe.utils.now())
            if current_time > self.test_registration_closing_time:
                return False

        return True

    def is_expired(self):
        """
        Check if this event has expired.

        Returns:
            bool: True if expired, False otherwise.
        """
        if not self.expired_date:
            return False

        current_time = frappe.utils.get_datetime(frappe.utils.now())
        return current_time > self.expired_date
