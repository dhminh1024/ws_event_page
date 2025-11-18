# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import now_datetime
import re


class WSEKDDCertificateRegistration(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        parent: DF.Data
        parent_email: DF.Data
        parent_full_name: DF.Data
        parent_phone_number: DF.Data
        parentfield: DF.Data
        parenttype: DF.Data
        rating: DF.Rating
        registration_datetime: DF.Datetime | None
    # end: auto-generated types

    def before_insert(self):
        """Auto-set registration datetime before inserting."""
        if not self.registration_datetime:
            self.registration_datetime = now_datetime()

    def validate(self):
        """Validate parent information."""
        self.validate_email()
        self.validate_phone_number()
        self.validate_parent_name()

    def validate_email(self):
        """Validate parent email format."""
        if not self.parent_email:
            frappe.throw(_("Parent Email is required"))

        # Basic email validation using regex
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, self.parent_email):
            frappe.throw(_("Invalid email format for Parent Email"))

        # Normalize email to lowercase
        self.parent_email = self.parent_email.lower().strip()

    def validate_phone_number(self):
        """Validate parent phone number."""
        if not self.parent_phone_number:
            frappe.throw(_("Parent Phone Number is required"))

        # Remove spaces and special characters for validation
        phone_clean = re.sub(r'[^\d+]', '', self.parent_phone_number)

        # Check minimum length (at least 10 digits)
        if len(phone_clean) < 10:
            frappe.throw(_("Parent Phone Number must be at least 10 digits"))

    def validate_parent_name(self):
        """Validate parent full name."""
        if not self.parent_full_name or not self.parent_full_name.strip():
            frappe.throw(_("Parent Full Name is required"))

        # Normalize parent name (strip extra spaces)
        self.parent_full_name = " ".join(self.parent_full_name.split())
