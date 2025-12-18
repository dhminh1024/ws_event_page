# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def get_certificate(certificate_token):
    """Retrieve certificate information using a certificate token.

    This endpoint allows parents to access their child's certificate using
    the unique token sent to them via email.

    Args:
        certificate_token (str): Unique certificate token

    Returns:
        dict: Response containing certificate data for rendering
    """
    try:
        # Validate token is provided
        if not certificate_token:
            return {"success": False, "message": _("Certificate token is required")}

        # Find registration by certificate token
        registration_name = frappe.db.get_value(
            "WSE KDD Student Registration",
            filters={"certificate_token": certificate_token},
            fieldname="name",
        )

        if not registration_name:
            return {
                "success": False,
                "message": _(
                    "Invalid certificate token. Please check your email for the correct link."
                ),
            }

        # Get the registration document
        registration = frappe.get_doc("WSE KDD Student Registration", registration_name)

        # Get certificate data
        certificate_data = registration.get_certificate_data()

        # Add additional information
        certificate_data["registration_date"] = registration.creation

        # Get parent submissions (for display purposes)
        parent_submissions = []
        for submission in registration.certificate_registration_submission:
            parent_submissions.append(
                {
                    "parent_name": submission.parent_full_name,
                    "parent_email": submission.parent_email,
                    "parent_phone": submission.parent_phone_number,
                    "registration_datetime": submission.registration_datetime,
                }
            )

        certificate_data["parent_submissions"] = parent_submissions
        certificate_data["total_parent_submissions"] = len(parent_submissions)

        return {
            "success": True,
            "data": certificate_data,
            "message": _("Certificate retrieved successfully"),
        }

    except frappe.ValidationError as ve:
        return {"success": False, "message": str(ve)}

    except Exception as e:
        frappe.log_error(message=str(e), title="KDD Get Certificate Error")
        return {
            "success": False,
            "message": _(
                "Failed to retrieve certificate. Please try again or contact support."
            ),
        }


@frappe.whitelist(allow_guest=True)
def resend_certificate_email(certificate_token, parent_email):
    """Resend certificate email to a parent.

    Allows parents to request the certificate URL to be sent again if they
    lost the original email.

    Args:
        certificate_token (str): Unique certificate token
        parent_email (str): Parent's email address

    Returns:
        dict: Response indicating success or failure
    """
    try:
        # Validate inputs
        if not certificate_token or not parent_email:
            return {
                "success": False,
                "message": _("Certificate token and email are required"),
            }

        # Find registration by certificate token
        registration_name = frappe.db.get_value(
            "WSE KDD Student Registration",
            filters={"certificate_token": certificate_token},
            fieldname="name",
        )

        if not registration_name:
            return {"success": False, "message": _("Invalid certificate token")}

        # Get the registration document
        registration = frappe.get_doc("WSE KDD Student Registration", registration_name)

        # Verify email belongs to one of the registered parents
        email_found = False
        parent_name = None
        for submission in registration.certificate_registration_submission:
            if submission.parent_email.lower() == parent_email.lower():
                email_found = True
                parent_name = submission.parent_full_name
                break

        if not email_found:
            return {
                "success": False,
                "message": _("Email address not found in registration records"),
            }

        # Get event details
        event = frappe.get_doc("WSE KDD Visit Event", registration.visit_event)

        # Send email
        try:
            from ws_event_page.api.kindergarten_demo_day.email import (
                send_certificate_email,
            )

            send_certificate_email(
                parent_email=parent_email,
                student_name=registration.student_full_name,
                certificate_url=registration.certificate_url,
                event_title=event.title,
                parent_name=parent_name,
            )

            return {
                "success": True,
                "message": _("Certificate email has been resent to {0}").format(
                    parent_email
                ),
            }

        except Exception as email_error:
            frappe.log_error(
                message=str(email_error), title="KDD Resend Certificate Email Failed"
            )
            return {
                "success": False,
                "message": _("Failed to send email. Please try again later."),
            }

    except Exception as e:
        frappe.log_error(message=str(e), title="KDD Resend Certificate Error")
        return {
            "success": False,
            "message": _(
                "Failed to resend certificate email. Please try again or contact support."
            ),
        }
