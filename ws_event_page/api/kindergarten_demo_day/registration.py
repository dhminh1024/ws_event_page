# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.rate_limiter import rate_limit


@frappe.whitelist(allow_guest=True)
@rate_limit(limit=10, seconds=3600)  # 10 requests per hour
def submit_registration(
    visit_event,
    student_full_name,
    student_dob,
    parent_full_name,
    parent_email,
    parent_phone_number
):
    """Submit a parent registration for a student's event certificate.

    This endpoint handles both new student registrations and additional parent
    submissions for existing students. Multiple parents can register for the
    same student, and all will receive the same certificate URL.

    Rate Limited: 10 requests per hour per IP address

    Args:
        visit_event (str): Name of the visit event
        student_full_name (str): Full name of the student
        student_dob (str): Date of birth of the student
        parent_full_name (str): Full name of the parent
        parent_email (str): Email address of the parent
        parent_phone_number (str): Phone number of the parent

    Returns:
        dict: Response containing certificate URL and success status
    """
    try:
        # Import validation utilities
        from ws_event_page.api.kindergarten_demo_day.validation import (
            validate_and_sanitize_inputs,
            validate_email_format,
            validate_phone_number,
            validate_student_name,
            validate_date_of_birth
        )

        # Validate required fields
        if not all([visit_event, student_full_name, parent_full_name, parent_email, parent_phone_number]):
            return {
                "success": False,
                "message": _("All fields are required")
            }

        # Sanitize all inputs
        sanitized_data = validate_and_sanitize_inputs({
            "visit_event": visit_event,
            "student_full_name": student_full_name,
            "student_dob": student_dob,
            "parent_full_name": parent_full_name,
            "parent_email": parent_email,
            "parent_phone_number": parent_phone_number
        })

        # Additional validation
        validate_email_format(sanitized_data["parent_email"])
        validate_phone_number(sanitized_data["parent_phone_number"])
        validate_student_name(sanitized_data["student_full_name"])
        validate_date_of_birth(sanitized_data["student_dob"])

        # Use sanitized data going forward
        visit_event = sanitized_data["visit_event"]
        student_full_name = sanitized_data["student_full_name"]
        student_dob = sanitized_data["student_dob"]
        parent_full_name = sanitized_data["parent_full_name"]
        parent_email = sanitized_data["parent_email"]
        parent_phone_number = sanitized_data["parent_phone_number"]

        # Check if event exists
        if not frappe.db.exists("WSE KDD Visit Event", visit_event):
            return {
                "success": False,
                "message": _("Event not found")
            }

        # Check if registration is open
        event = frappe.get_doc("WSE KDD Visit Event", visit_event)
        if not event.registration_open:
            return {
                "success": False,
                "message": _("Registration is closed for this event")
            }

        # Check if certificate can be generated (group photo exists)
        if not event.group_photo:
            return {
                "success": False,
                "message": _("Certificate is not available yet. Please contact the school.")
            }

        # Check for existing registration
        from ws_event_page.wellspring_event_page.doctype.wse_kdd_student_registration.wse_kdd_student_registration import (
            WSEKDDStudentRegistration
        )

        existing_registration = WSEKDDStudentRegistration.get_or_create_registration(
            visit_event=visit_event,
            student_full_name=student_full_name,
            student_dob=student_dob
        )

        if existing_registration:
            # Add new parent submission to existing registration
            existing_registration.add_parent_submission(
                parent_full_name=parent_full_name,
                parent_email=parent_email,
                parent_phone_number=parent_phone_number
            )
            existing_registration.save(ignore_permissions=True)

            registration = existing_registration
            is_new_registration = False

        else:
            # Create new student registration
            registration = frappe.get_doc({
                "doctype": "WSE KDD Student Registration",
                "visit_event": visit_event,
                "student_full_name": student_full_name,
                "student_dob": student_dob
            })

            # Add first parent submission
            registration.append("certificate_registration_submission", {
                "parent_full_name": parent_full_name,
                "parent_email": parent_email,
                "parent_phone_number": parent_phone_number
            })

            registration.insert(ignore_permissions=True)
            is_new_registration = True

        # Commit the transaction
        frappe.db.commit()

        # Send email to parent with certificate URL
        try:
            from ws_event_page.api.kindergarten_demo_day.email import send_certificate_email

            send_certificate_email(
                parent_email=parent_email,
                student_name=student_full_name,
                certificate_url=registration.certificate_url,
                event_title=event.title,
                parent_name=parent_full_name
            )
        except Exception as email_error:
            # Log email error but don't fail the registration
            frappe.log_error(
                message=str(email_error),
                title="KDD Certificate Email Failed"
            )

        # Build response
        return {
            "success": True,
            "data": {
                "certificate_url": registration.certificate_url,
                "certificate_token": registration.certificate_token,
                "student_name": registration.student_full_name,
                "event_title": event.title,
                "is_new_registration": is_new_registration
            },
            "message": _("Registration submitted successfully! Certificate URL has been sent to your email.")
        }

    except frappe.ValidationError as ve:
        # Handle validation errors (from DocType validation methods)
        frappe.db.rollback()
        return {
            "success": False,
            "message": str(ve)
        }

    except Exception as e:
        # Handle unexpected errors
        frappe.db.rollback()
        frappe.log_error(message=str(e), title="KDD Submit Registration Error")
        return {
            "success": False,
            "message": _("Failed to submit registration. Please try again or contact support.")
        }
