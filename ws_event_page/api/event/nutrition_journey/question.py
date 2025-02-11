import frappe
from datetime import datetime


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_all_questions():
    questions = frappe.get_all(
        "WSE NJ Question", fields="*", order_by="sequence_number"
    )

    return questions
