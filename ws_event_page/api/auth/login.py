import frappe


@frappe.whitelist(allow_guest=True)
def get_settings():
    return frappe.get_single("WSE Settings").as_dict()


@frappe.whitelist(allow_guest=True, methods=["POST"])
def get_student_by_wellspring_code(wellspring_code):
    try:
        student = frappe.get_doc(
            "SIS Student", {"wellspring_student_code": wellspring_code}
        )
        current_class = student.get_current_class()
        std_person = frappe.get_doc("SIS Person", student.person)
        current_class_title = current_class.title if current_class else None
        return {
            "fullName": std_person.full_name,
            "personId": std_person.name,
            "email": std_person.email,
            "wellspringCode": wellspring_code,
            "currentClass": current_class_title,
        }
    except:
        frappe.throw("Student not found")


@frappe.whitelist(allow_guest=True, methods=["POST"])
def login_with_wellspring_code(wellspring_code):
    # Check if code is a student code
    try:
        student = frappe.get_doc(
            "SIS Student", {"wellspring_student_code": wellspring_code}
        )
        current_class = student.get_current_class()

        std_person = frappe.get_doc("SIS Person", student.person)

        return {
            "userType": "Student",
            "userData": {
                "fullName": std_person.full_name,
                "email": std_person.email,
                "gender": std_person.gender,
                "wellspringCode": wellspring_code,
                "currentClass": current_class,
            },
        }

    except:
        pass

    # Check if code is a staff code
    try:
        staff = frappe.get_doc("SIS Staff", {"employee_code": wellspring_code})
        staff_person = frappe.get_doc("SIS Person", staff.person).as_dict()

        return {
            "userType": "Staff",
            "userData": {
                "fullName": staff_person.full_name,
                "email": staff_person.email,
                "gender": staff_person.gender,
                "wellspringCode": wellspring_code,
            },
        }

    except:
        frappe.throw("Invalid code: No student or staff found with this code")
