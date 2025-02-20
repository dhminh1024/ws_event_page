import frappe


def create_roles_if_not_exists():
    roles = [
        {"role_name": "WSE HR Admin", "desk_access": 1},
        {"role_name": "WSE AC Admin", "desk_access": 1},
        {"role_name": "WSE NJ Admin", "desk_access": 1},
    ]

    for role in roles:
        if not frappe.db.exists("Role", role["role_name"]):
            role_doc = frappe.new_doc("Role")
            role_doc.role_name = role["role_name"]
            role_doc.desk_access = role["desk_access"]
            role_doc.save(ignore_permissions=True)
            frappe.db.commit()
