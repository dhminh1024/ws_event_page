# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _
import re


def validate_and_sanitize_inputs(data):
    """Validate and sanitize all input data for security.

    Args:
        data (dict): Dictionary of input data to validate

    Returns:
        dict: Sanitized data

    Raises:
        frappe.ValidationError: If validation fails
    """
    sanitized = {}

    # Sanitize string inputs (remove XSS, SQL injection attempts)
    for key, value in data.items():
        if isinstance(value, str):
            # Strip whitespace
            value = value.strip()

            # Remove potential SQL injection characters
            if any(dangerous in value.lower() for dangerous in ["';", "--", "/*", "*/", "xp_", "sp_"]):
                frappe.throw(_("Invalid input detected in {0}").format(key))

            # Remove potential XSS attempts
            if any(dangerous in value.lower() for dangerous in ["<script", "javascript:", "onerror=", "onclick="]):
                frappe.throw(_("Invalid input detected in {0}").format(key))

            # Normalize whitespace
            value = " ".join(value.split())

            sanitized[key] = value
        else:
            sanitized[key] = value

    return sanitized


def validate_email_format(email):
    """Validate email format using regex.

    Args:
        email (str): Email address to validate

    Returns:
        bool: True if valid

    Raises:
        frappe.ValidationError: If email format is invalid
    """
    if not email:
        frappe.throw(_("Email is required"))

    # Email regex pattern
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if not re.match(pattern, email):
        frappe.throw(_("Invalid email format"))

    return True


def validate_phone_number(phone):
    """Validate phone number format.

    Args:
        phone (str): Phone number to validate

    Returns:
        bool: True if valid

    Raises:
        frappe.ValidationError: If phone format is invalid
    """
    if not phone:
        frappe.throw(_("Phone number is required"))

    # Remove spaces and special characters
    phone_clean = re.sub(r'[^\d+]', '', phone)

    # Check minimum length (at least 10 digits)
    if len(phone_clean) < 10:
        frappe.throw(_("Phone number must be at least 10 digits"))

    # Check for valid Vietnamese phone numbers (optional)
    # Vietnamese mobile numbers typically start with 0 and have 10 digits
    vietnam_pattern = r'^(\+84|84|0)([3|5|7|8|9])([0-9]{8})$'
    international_pattern = r'^\+?[1-9]\d{1,14}$'

    if not (re.match(vietnam_pattern, phone_clean) or re.match(international_pattern, phone_clean)):
        # Just log a warning, don't block - some numbers might be valid but not match pattern
        frappe.log_error(
            message=f"Phone number {phone} doesn't match expected patterns",
            title="KDD Phone Validation Warning"
        )

    return True


def validate_student_name(name):
    """Validate student full name.

    Args:
        name (str): Student name to validate

    Returns:
        bool: True if valid

    Raises:
        frappe.ValidationError: If name is invalid
    """
    if not name or not name.strip():
        frappe.throw(_("Student name is required"))

    # Check minimum length
    if len(name.strip()) < 2:
        frappe.throw(_("Student name must be at least 2 characters"))

    # Check for numbers in name (unlikely for a real name)
    if re.search(r'\d', name):
        frappe.msgprint(
            msg=_("Student name contains numbers. Please verify."),
            title=_("Name Validation"),
            indicator="orange"
        )

    return True


def validate_date_of_birth(dob):
    """Validate date of birth for kindergarten student.

    Args:
        dob (str or date): Date of birth to validate

    Returns:
        bool: True if valid

    Raises:
        frappe.ValidationError: If DOB is invalid
    """
    from frappe.utils import getdate

    if not dob:
        # DOB is optional, so return True if not provided
        return True

    try:
        dob_date = getdate(dob)
    except Exception:
        frappe.throw(_("Invalid date format for date of birth"))

    today = getdate()

    # Check if DOB is not in the future
    if dob_date > today:
        frappe.throw(_("Date of birth cannot be in the future"))

    # Check if student is reasonable age (between 0-10 years for kindergarten)
    age_years = (today - dob_date).days / 365.25

    if age_years > 10:
        frappe.msgprint(
            msg=_("Student appears to be over 10 years old. Please verify the date of birth."),
            title=_("Age Verification"),
            indicator="orange"
        )

    if age_years < 0:
        frappe.throw(_("Invalid date of birth"))

    return True


def validate_certificate_token(token):
    """Validate certificate token format.

    Args:
        token (str): Certificate token to validate

    Returns:
        bool: True if valid

    Raises:
        frappe.ValidationError: If token is invalid
    """
    if not token:
        frappe.throw(_("Certificate token is required"))

    # Token should be URL-safe and of reasonable length
    if len(token) < 20:
        frappe.throw(_("Invalid certificate token"))

    # Check for URL-safe characters only
    if not re.match(r'^[A-Za-z0-9_-]+$', token):
        frappe.throw(_("Invalid certificate token format"))

    return True


def sanitize_html_content(content):
    """Sanitize HTML content to prevent XSS attacks.

    Args:
        content (str): HTML content to sanitize

    Returns:
        str: Sanitized content
    """
    import html

    if not content:
        return content

    # Escape HTML special characters
    sanitized = html.escape(content)

    return sanitized
