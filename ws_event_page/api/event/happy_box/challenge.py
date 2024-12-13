import frappe
from datetime import datetime


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_all_challenges():
    challenges = frappe.get_all(
        "WSE HB Challenge", fields="*", order_by="sequence_number"
    )

    # for each challenge, if release_date is not now, create is_enabled = False
    for challenge in challenges:
        release_date = frappe.utils.get_datetime(challenge["release_date"])
        current_time = frappe.utils.get_datetime(frappe.utils.now())
        current_date = frappe.utils.getdate(frappe.utils.now())

        if release_date > current_time:
            challenge["isEnabled"] = False
        else:
            challenge["isEnabled"] = True
            if release_date.date() == current_date:
                challenge["isToday"] = True
            else:
                challenge["isToday"] = False

    return challenges
