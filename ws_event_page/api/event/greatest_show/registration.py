from __future__ import annotations

from fileinput import filename
from typing import Dict

import frappe
from frappe.utils.file_manager import save_file

ENTRY_GROUP_CHOICES = {
    "primary students": "Primary students",
    "primary": "Primary students",
    "primary_students": "Primary students",
    "secondary students": "Secondary students",
    "secondary": "Secondary students",
    "secondary_students": "Secondary students",
    "adult": "Adult",
    "parent": "Adult",
    "parent_teacher_staff": "Adult",
}

ENTRY_CATEGORY_CHOICES = {
    "singing": "Singing",
    "dancing": "Dancing",
    "instrumental": "Instrumental",
    "instrument": "Instrumental",
    "other": "Other",
    "talent": "Other",
}

# Field label translations
FIELD_LABELS_VN = {
    "entry group": "nhóm tham gia",
    "entry category": "hạng mục",
}


def _normalize_choice(value: str | None, mapping: Dict[str, str], field_label: str) -> str:
    field_label_vn = FIELD_LABELS_VN.get(field_label, field_label)

    if not value:
        frappe.throw(f"{field_label_vn.capitalize()} là bắt buộc | {field_label.capitalize()} is required")

    key = value.strip().lower()
    normalized = mapping.get(key)
    if normalized:
        return normalized

    # also accept already normalized values
    if value in mapping.values():
        return value

    frappe.throw(f"{field_label_vn.capitalize()} không hợp lệ: {value} | Invalid {field_label}: {value}")


@frappe.whitelist(allow_guest=True, methods=["POST"])
def create_registration(
    full_name: str,
    email: str,
    mobile_number: str,
    entry_group: str,
    entry_name: str,
    entry_category: str,
    entry_participants: str | None = None,
    instrumental_info: str | None = None,
    talent_info: str | None = None,
):
    """Create a public registration record for the Greatest Show event."""
    from ws_event_page.wellspring_event_page.doctype.wse_gs_program.wse_gs_program import (
        WSEGSProgram,
    )

    # Get current program
    current_program = WSEGSProgram.get_current_gs_program()
    if not current_program:
        frappe.throw(
            "Không có chương trình Greatest Show nào đang mở đăng ký | "
            "No active Greatest Show program is currently available for registration"
        )

    normalized_group = _normalize_choice(entry_group, ENTRY_GROUP_CHOICES, "entry group")
    normalized_category = _normalize_choice(
        entry_category, ENTRY_CATEGORY_CHOICES, "entry category"
    )

    if normalized_category == "Instrumental":
        if not (instrumental_info and instrumental_info.strip()):
            frappe.throw(
                "Thông tin nhạc cụ là bắt buộc cho hạng mục Nhạc cụ | "
                "Instrument information is required for Instrumental category"
            )
        talent_info = None
    elif normalized_category == "Other":
        if not (talent_info and talent_info.strip()):
            frappe.throw(
                "Thông tin tài năng là bắt buộc cho hạng mục Khác | "
                "Talent information is required for Other category"
            )
        instrumental_info = None
    else:
        instrumental_info = None
        talent_info = None

    doc = frappe.get_doc(
        {
            "doctype": "WSE GS Registration",
            "full_name": full_name.strip(),
            "email": email.strip(),
            "mobile_number": mobile_number.strip(),
            "entry_group": normalized_group,
            "entry_name": entry_name.strip(),
            "entry_category": normalized_category,
            "entry_participants": (entry_participants or "").strip() or None,
            "instrumental_info": (instrumental_info or "").strip() or None,
            "talent_info": (talent_info or "").strip() or None,
            "status": "Waitting",
            "gs_program": current_program.name,
        }
    )

    doc.insert(ignore_permissions=True)

    return {
        "message": "Đăng ký thành công | Registration created successfully",
        "registration_id": doc.name,
        "gs_program": current_program.name,
        "program_title": current_program.title_en,
    }

def _clear_registration_attachments(docname: str) -> None:
    attachments = frappe.get_all(
        "File",
        filters={
            "attached_to_doctype": "WSE GS Registration",
            "attached_to_name": docname,
        },
    )
    for attachment in attachments:
        frappe.delete_doc("File", attachment.name, ignore_permissions=True)

@frappe.whitelist(allow_guest=True, methods=["POST"])
def upload_registration_file(registration_id: str):
    """Upload or replace the performance attachment for an existing registration."""

    frappe.log("upload_registration_file called with registration_id: {}".format(registration_id))
    if not registration_id:
        frappe.throw("Mã đăng ký là bắt buộc | Registration ID is required")

    # doc = frappe.get_doc("WSE GS Registration", registration_id)

    file = frappe.request.files.get("attach_file") or frappe.request.files.get("file")
    if not file:
        frappe.throw("Không có tệp tin được tải lên | No file uploaded")

    _clear_registration_attachments(registration_id)

    # file_doc = save_file(
    #     fname=upload.filename,
    #     content=upload.stream.read(),
    #     dt=doc.doctype,
    #     dn=registration_id,
    #     is_private=0,
    # )
    # doc.db_set("attach_file", file_doc.file_url)
    file_content = file.stream.read()
    file_doc = frappe.get_doc(
        {
            "doctype": "File",
            "attached_to_doctype": "WSE GS Registration",
            "attached_to_name": registration_id,
            "attached_to_field": "attach_file",
            # "folder": student_application.student_folder,
            "file_name": file.filename,
            "is_private": 1,
            "content": file_content,
        }
    ).save()

    return {
        "message": "Tải tệp tin thành công | Attachment uploaded successfully",
        "registration_id": registration_id,
        "file_url": file_doc.file_url,
    }


@frappe.whitelist()
def resend_confirmation_email(registration_id: str):
    """Resend confirmation email for a registration."""
    from ws_event_page.wellspring_event_page.doctype.wse_gs_registration.wse_gs_registration import (
        GSRegistrationStatus,
    )

    registration = frappe.get_doc("WSE GS Registration", registration_id)

    if registration.status == GSRegistrationStatus.CANCELLED.value:
        frappe.throw(
            "Không thể gửi lại email cho đăng ký đã huỷ | "
            "Cannot resend email for cancelled registration"
        )

    registration.send_confirmation_email()

    return {
        "message": "Email xác nhận đã được gửi lại | Confirmation email has been resent",
        "registration_id": registration.name,
    }


@frappe.whitelist()
def cancel_registration(registration_id: str):
    """Cancel a registration."""
    from ws_event_page.wellspring_event_page.doctype.wse_gs_registration.wse_gs_registration import (
        GSRegistrationStatus,
    )

    registration = frappe.get_doc("WSE GS Registration", registration_id)

    if registration.status == GSRegistrationStatus.CANCELLED.value:
        frappe.throw(
            "Đăng ký đã được huỷ trước đó | Registration is already cancelled"
        )

    if registration.status == GSRegistrationStatus.APPROVED.value:
        frappe.throw(
            "Không thể huỷ đăng ký đã được phê duyệt | "
            "Cannot cancel approved registration"
        )

    registration.status = GSRegistrationStatus.CANCELLED.value
    registration.save()
    registration.send_cancellation_email()

    return {
        "message": "Đăng ký đã được huỷ | Registration has been cancelled",
        "registration_id": registration.name,
    }
