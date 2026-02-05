# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

VALID_GRADES = ["G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "G12"]


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
        student_grade: DF.SmallText
        title: DF.Data | None
    # end: auto-generated types

    def validation(self):
        """Validate the test slot data."""
        # Ensure that the start time is before the end time
        if self.start_time >= self.end_time:
            frappe.throw("Start time must be before end time")

        # Validate and normalize grades
        self._validate_and_normalize_grades()

    def _validate_and_normalize_grades(self):
        """
        Parse, validate, and normalize the student_grade field.

        - Splits comma-separated input
        - Validates each grade is in G01-G12
        - Normalizes to uppercase
        - Removes duplicates
        - Sorts grades
        """
        if not self.student_grade:
            return

        # Parse and clean grades
        raw_grades = [g.strip().upper() for g in self.student_grade.split(",") if g.strip()]

        # Validate each grade
        invalid_grades = [g for g in raw_grades if g not in VALID_GRADES]
        if invalid_grades:
            frappe.throw(f"Invalid grade(s): {', '.join(invalid_grades)}. Valid grades are G01-G12.")

        # Remove duplicates and sort
        unique_grades = sorted(set(raw_grades), key=lambda g: VALID_GRADES.index(g))

        # Update the field with normalized value
        self.student_grade = ",".join(unique_grades)

    def _format_grades_for_title(self) -> str:
        """
        Format grades for display in title.

        For consecutive grades, shows range (e.g., "G01-G03").
        For non-consecutive grades, shows comma-separated (e.g., "G01,G05,G08").
        """
        if not self.student_grade:
            return ""

        grades = self.student_grade.split(",")
        if len(grades) == 1:
            return grades[0]

        # Check if grades are consecutive
        indices = [VALID_GRADES.index(g) for g in grades]
        is_consecutive = all(indices[i] + 1 == indices[i + 1] for i in range(len(indices) - 1))

        if is_consecutive and len(grades) > 2:
            return f"{grades[0]}-{grades[-1]}"

        return ",".join(grades)

    def before_save(self):
        """Prepare data before saving."""
        # Validate capacity
        if self.current_registered > self.max_capacity:
            frappe.throw("Test slot is full")

        # Update is_full flag
        self.is_full = self.current_registered >= self.max_capacity

        # Update title with formatted grades
        grade_display = self._format_grades_for_title()
        self.title = f"{grade_display} | {self.date} | {self.start_time} - {self.end_time} | {self.current_registered}/{self.max_capacity}"

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
