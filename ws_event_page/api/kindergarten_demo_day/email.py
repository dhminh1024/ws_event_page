# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils import get_url


def send_certificate_email(parent_email, student_name, certificate_url, event_title, parent_name):
    """Send certificate notification email to parent.

    Args:
        parent_email (str): Parent's email address
        student_name (str): Student's full name
        certificate_url (str): URL to access the certificate
        event_title (str): Title of the event
        parent_name (str): Parent's full name

    Returns:
        bool: True if email sent successfully, False otherwise

    Raises:
        Exception: If email sending fails
    """
    try:
        # Validate inputs
        if not all([parent_email, student_name, certificate_url, event_title, parent_name]):
            frappe.throw(_("All email parameters are required"))

        # Get email template
        template_path = "ws_event_page/templates/emails/kdd_certificate_notification.html"

        # Prepare template context
        context = {
            "parent_name": parent_name,
            "parent_email": parent_email,
            "student_name": student_name,
            "event_title": event_title,
            "certificate_url": certificate_url
        }

        # Render email content
        email_content = frappe.render_template(template_path, context)

        # Email subject
        subject = _("Chứng nhận tham gia | Certificate of Participation - {0}").format(student_name)

        # Send email
        frappe.sendmail(
            recipients=[parent_email],
            subject=subject,
            message=email_content,
            now=True,  # Send immediately
            reference_doctype="WSE KDD Student Registration",
            reference_name=None,  # Can be set if needed
            unsubscribe_message=None,
            delayed=False
        )

        # Log successful email
        frappe.log_error(
            message=f"Certificate email sent to {parent_email} for student {student_name}",
            title="KDD Certificate Email Sent",
        )

        return True

    except Exception as e:
        # Log error
        error_msg = f"Failed to send certificate email to {parent_email}: {str(e)}"
        frappe.log_error(
            message=error_msg,
            title="KDD Certificate Email Error"
        )
        raise Exception(error_msg)


def send_bulk_certificate_emails(visit_event):
    """Send certificate emails to all parents registered for an event.

    Useful for batch sending when group photo is uploaded after registrations.

    Args:
        visit_event (str): Name of the visit event

    Returns:
        dict: Summary of email sending results
    """
    try:
        # Get all registrations for the event
        registrations = frappe.get_all(
            "WSE KDD Student Registration",
            filters={"visit_event": visit_event},
            fields=["name"]
        )

        results = {
            "total": len(registrations),
            "sent": 0,
            "failed": 0,
            "errors": []
        }

        # Get event details
        event = frappe.get_doc("WSE KDD Visit Event", visit_event)

        # Send email to each parent in each registration
        for reg in registrations:
            registration = frappe.get_doc("WSE KDD Student Registration", reg["name"])

            # Send to all parents in the submission table
            for submission in registration.certificate_registration_submission:
                try:
                    send_certificate_email(
                        parent_email=submission.parent_email,
                        student_name=registration.student_full_name,
                        certificate_url=registration.certificate_url,
                        event_title=event.title,
                        parent_name=submission.parent_full_name
                    )
                    results["sent"] += 1

                except Exception as e:
                    results["failed"] += 1
                    results["errors"].append({
                        "email": submission.parent_email,
                        "error": str(e)
                    })

        return results

    except Exception as e:
        frappe.log_error(
            message=str(e),
            title="KDD Bulk Email Error"
        )
        raise
