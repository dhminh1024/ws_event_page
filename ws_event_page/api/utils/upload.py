import frappe


def save_image(docname, name, file_name, attach_to_field):
    # delete if exists before save
    attach_image = frappe.get_list(
        "File",
        filters=[
            ["file_name", "like", name + "%"],
            ["attached_to_field", "=", attach_to_field],
            ["attached_to_doctype", "=", docname],
            ["attached_to_name", "=", name],
        ],
    )
    if attach_image:
        for att_img in attach_image:
            frappe.delete_doc("File", att_img.name)
    frappe.db.commit()
    # save barcode image to file table
    attach_image = frappe.get_doc(
        {
            "doctype": "File",
            "file_name": file_name,
            "attached_to_doctype": docname,
            "attached_to_name": name,
            "attached_to_field": attach_to_field,
            "file_url": "/files/" + file_name,
            "is_private": 0,
        }
    )

    attach_image.insert()
    return attach_image
