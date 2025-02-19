import frappe
from ws_event_page.wellspring_event_page.doctype.wse_ac_lead.wse_ac_lead import (
    WSEACLeadStatus,
)


@frappe.whitelist(methods=["POST"])
def send_confirmation_emails(lead_ids_str):
    lead_ids = lead_ids_str.split(",")
    count = 0
    for lead_id in lead_ids:
        lead = frappe.get_doc("WSE AC Lead", lead_id)
        if lead.status == WSEACLeadStatus.NEW.value:
            lead.send_confirmation_email()
            count += 1

    return {
        "message": f"{count} email(s) đã được đưa vào danh sách gửi",
        "count": count,
    }


@frappe.whitelist(methods=["GET"])
def get_lead_info(lead_id):
    lead = frappe.get_doc("WSE AC Lead", lead_id)
    return lead.as_dict()


@frappe.whitelist(methods=["POST"])
def lead_checkin(lead_id):
    lead = frappe.get_doc("WSE AC Lead", lead_id)
    if lead.status in [
        WSEACLeadStatus.NEW.value,
        WSEACLeadStatus.CONFIRMATION_EMAIL_SENT.value,
    ]:
        lead.status = WSEACLeadStatus.CHECKED_IN.value
        lead.save()
    elif lead.status == WSEACLeadStatus.CHECKED_IN.value:
        return f"ERROR: {lead.full_name} đã checkin rồi"
    else:
        return f"ERROR: Không thể checkin cho lead này"
    return f"Đã check in cho {lead.student_full_name} thành công"
