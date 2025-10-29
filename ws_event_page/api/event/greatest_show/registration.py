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


def _normalize_choice(value: str | None, mapping: Dict[str, str], field_label: str) -> str:
    if not value:
        frappe.throw(f"{field_label} is required")
    key = value.strip().lower()
    normalized = mapping.get(key)
    if normalized:
        return normalized
    # also accept already normalized values
    if value in mapping.values():
        return value
    frappe.throw(f"Invalid {field_label}: {value}")


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

    normalized_group = _normalize_choice(entry_group, ENTRY_GROUP_CHOICES, "entry group")
    normalized_category = _normalize_choice(
        entry_category, ENTRY_CATEGORY_CHOICES, "entry category"
    )

    if normalized_category == "Instrumental":
        if not (instrumental_info and instrumental_info.strip()):
            frappe.throw("Instrument information is required for Instrumental category")
        talent_info = None
    elif normalized_category == "Other":
        if not (talent_info and talent_info.strip()):
            frappe.throw("Talent information is required for Other category")
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
        }
    )

    doc.insert(ignore_permissions=True)

    return {
        "message": "Registration created successfully",
        "registration_id": doc.name,
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
        frappe.throw("Registration ID is required")

    # doc = frappe.get_doc("WSE GS Registration", registration_id)

    file = frappe.request.files.get("attach_file") or frappe.request.files.get("file")
    if not file:
        frappe.throw("No file uploaded")

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
        "message": "Attachment uploaded successfully",
        "registration_id": registration_id,
        "file_url": file_doc.file_url,
    }
