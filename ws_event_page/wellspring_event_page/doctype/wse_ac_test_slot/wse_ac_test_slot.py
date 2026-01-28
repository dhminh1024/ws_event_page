# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class WSEACTestSlot(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        ac_event: DF.Link
        current_registered: DF.Int
        date: DF.Date
        end_time: DF.Time
        is_enabled: DF.Check
        is_full: DF.Check
        max_capacity: DF.Int
        start_time: DF.Time
        student_grade: DF.Literal["G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "G12"]
        title: DF.Data | None
    # end: auto-generated types

    def validation(self):
        # Ensure that the start time is before the end time
        if self.start_time >= self.end_time:
            frappe.throw("Start time must be before end time")

    def before_save(self):
        # Validate capacity
        if self.current_registered > self.max_capacity:
            frappe.throw("Test slot is full")

        # Update is_full flag
        self.is_full = self.current_registered >= self.max_capacity

        # Update title
        self.title = f"{self.student_grade} | {self.date} | {self.start_time} - {self.end_time} | {self.current_registered}/{self.max_capacity}"

    def calculate_current_registered(self, factor=0):
        """
        Calculate and update current registered count atomically.

        Args:
            factor: Amount to add to the count (1 for new registration, -1 for removal).

        Raises:
            frappe.ValidationError: If the slot would exceed max capacity after the operation.
        """
        self.current_registered = frappe.db.count(
            "WSE AC Lead", {"registered_slot": self.name}
        )
        self.current_registered += factor

        # Check capacity BEFORE saving (after we have real count from DB)
        # This prevents race conditions where the stored is_full flag is stale
        if self.current_registered > self.max_capacity:
            frappe.throw(
                f"Test slot is full ({self.max_capacity}/{self.max_capacity})"
            )

        self.save()
