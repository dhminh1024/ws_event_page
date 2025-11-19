# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import get_url
import secrets


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
        certificate_url: DF.SmallText | None
        kindergarten: DF.Link | None
        student_dob: DF.Date | None
        student_full_name: DF.Data
        visit_event: DF.Link
    # end: auto-generated types

    def before_insert(self):
        """Generate certificate token and URL before inserting the document."""
        self.generate_certificate_token()
        self.generate_certificate_url()
        self.check_and_generate_certificate()

    def validate(self):
        """Validate student registration data."""
        self.validate_student_data()
        self.validate_event_registration_open()

    def generate_certificate_token(self):
        """Generate a unique, secure certificate token.

        Uses secrets.token_urlsafe to generate a cryptographically strong random token.
        Token is 16 bytes (~22 characters) for balance between security and URL friendliness.
        """
        if not self.certificate_token:
            self.certificate_token = secrets.token_urlsafe(16)

    def generate_certificate_url(self):
        """Generate the certificate URL using the token."""
        if self.certificate_token and self.visit_event:
            base_url = get_url()
            base_url = base_url.rstrip('/')
            self.certificate_url = (
                f"{base_url}/events/kindergarten-demo-day?"
                f"event={self.visit_event}&"
                f"action=certificate&"
                f"certificate_token={self.certificate_token}"
            )

    def check_and_generate_certificate(self):
        """Check if certificate can be generated based on group photo availability."""
        if self.visit_event:
            event = frappe.get_doc("WSE KDD Visit Event", self.visit_event)
            if event.group_photo:
                self.certificate_generated = 1
            else:
                self.certificate_generated = 0

    def validate_student_data(self):
        """Validate student full name and DOB format."""
        # Ensure student full name is not empty
        if not self.student_full_name or not self.student_full_name.strip():
            frappe.throw(_("Student Full Name is required"))

        # Normalize student name (strip extra spaces)
        self.student_full_name = " ".join(self.student_full_name.split())

        # Validate DOB if provided
        if self.student_dob:
            from frappe.utils import getdate

            dob = getdate(self.student_dob)
            today = getdate()

            # Check if DOB is not in the future
            if dob > today:
                frappe.throw(_("Student Date of Birth cannot be in the future"))

            # Check if student is reasonable age (between 0-10 years for kindergarten)
            age_years = (today - dob).days / 365.25
            if age_years > 10:
                frappe.msgprint(
                    msg=_("Student appears to be over 10 years old. Please verify the date of birth."),
                    title=_("Age Verification"),
                    indicator="orange"
                )

    def validate_event_registration_open(self):
        """Validate that the event registration is open."""
        if self.visit_event:
            event = frappe.get_doc("WSE KDD Visit Event", self.visit_event)
            if not event.registration_open:
                frappe.throw(_("Registration is closed for this event"))

    @staticmethod
    def get_or_create_registration(visit_event, student_full_name, student_dob=None):
        """Get existing registration or return None if not found.

        Args:
            visit_event: Name of the visit event
            student_full_name: Full name of the student
            student_dob: Date of birth of the student (optional)

        Returns:
            Document or None: Existing registration document or None
        """
        # Normalize student name for search
        student_full_name = " ".join(student_full_name.split())

        # Search for existing registration
        filters = {
            "visit_event": visit_event,
            "student_full_name": student_full_name
        }

        # Add DOB to filter if provided
        if student_dob:
            filters["student_dob"] = student_dob

        existing = frappe.db.get_value(
            "WSE KDD Student Registration",
            filters=filters,
            fieldname="name"
        )

        if existing:
            return frappe.get_doc("WSE KDD Student Registration", existing)

        return None

    def add_parent_submission(self, parent_full_name, parent_email, parent_phone_number, rating):
        """Add a new parent submission to the child table.

        Args:
            parent_full_name: Full name of the parent
            parent_email: Email address of the parent
            parent_phone_number: Phone number of the parent
            rating: Parent's rating of the event (1-5 stars)

        Returns:
            dict: The added child row
        """
        from frappe.utils import now_datetime

        # Add new row to child table
        row = self.append("certificate_registration_submission", {})
        row.parent_full_name = parent_full_name
        row.parent_email = parent_email
        row.parent_phone_number = parent_phone_number
        row.rating = rating
        row.registration_datetime = now_datetime()

        return row

    def get_certificate_data(self):
        """Get certificate data for rendering.

        Returns:
            dict: Certificate data including student info, event details, and group photo
        """
        if not self.certificate_generated:
            frappe.throw(_("Certificate has not been generated yet"))

        event = frappe.get_doc("WSE KDD Visit Event", self.visit_event)
        kindergarten = frappe.get_doc("WSE KDD Kindergarten", self.kindergarten) if self.kindergarten else None

        return {
            "student_name": self.student_full_name,
            "student_dob": self.student_dob,
            "event_title": event.title,
            "event_datetime": event.event_datetime,
            "group_photo": event.group_photo,
            "kindergarten_name": kindergarten.title if kindergarten else None,
            "kindergarten_logo": kindergarten.logo if kindergarten else None,
            "certificate_token": self.certificate_token,
            "certificate_url": self.certificate_url
        }
