import frappe


def validate_wellspring_code(wellspring_code):
    if not wellspring_code:
        frappe.throw("Wellspring Code is required")

    student = frappe.get_value(
        "SIS Student",
        {"wellspring_student_code": wellspring_code},
        ["name", "person"],
        as_dict=True,
    )
    staff = frappe.get_value(
        "SIS Staff",
        {"employee_code": wellspring_code},
        ["name", "person"],
        as_dict=True,
    )
    if not student and not staff:
        frappe.throw("Invalid Wellspring Code")
    if student and staff:
        frappe.throw("Wellspring Code is ambiguous")

    if student:
        student = frappe.get_doc("SIS Student", student["name"])
        person = frappe.get_doc("SIS Person", student.person)
        user_type = "Student"
        return (user_type, student, person)
    else:
        staff = frappe.get_doc("SIS Staff", staff["name"])
        person = frappe.get_doc("SIS Person", staff.person)
        user_type = "Staff"
        return (user_type, staff, person)
