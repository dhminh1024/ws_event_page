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

        current_registered: DF.Int
        date: DF.Date
        end_time: DF.Time
        is_enabled: DF.Check
        max_capacity: DF.Int
        start_time: DF.Time
        title: DF.Data | None
    # end: auto-generated types

    def validation(self):
        # Ensure that the start time is before the end time
        if self.start_time >= self.end_time:
            frappe.throw("Start time must be before end time")

    def before_save(self):
        self.title = f"{self.date} | {self.start_time} - {self.end_time} | {self.current_registered}/{self.max_capacity}"

    def calculate_current_registered(self):
        self.current_registered = frappe.db.count(
            "WSE AC Lead", {"registered_slot": self.name}
        )
        self.save()
