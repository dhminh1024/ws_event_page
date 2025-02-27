import frappe
from ws_event_page.api.utils.validation import validate_wellspring_code
from ws_event_page.wellspring_event_page.doctype.wse_hr_ticket.wse_hr_ticket import (
    HRTicketStatus,
    HRTicketType,
)
from ws_event_page.wellspring_event_page.doctype.wse_hr_order.wse_hr_order import (
    HROrderStatus,
)
from parent_portal.sis.doctype.sis_school_year.sis_school_year import SISSchoolYear


@frappe.whitelist(allow_guest=True, methods=["POST"])
def check_wellspring_code(wellspring_code):
    """API to check if Wellspring Code is valid. Return list of order related to the Wellspring Code.

    wellspring_code (str): Wellspring Code.
    """
    (user_type, student_staff, person) = validate_wellspring_code(wellspring_code)
    query = f"""
        SELECT
            `tabWSE HR Order`.name
        FROM
            `tabWSE HR Ticket` JOIN `tabWSE HR Order` ON `tabWSE HR Ticket`.parent = `tabWSE HR Order`.name
        WHERE
            `tabWSE HR Ticket`.wellspring_code = "{wellspring_code}"
            AND `tabWSE HR Order`.status != "{HROrderStatus.CANCELED.value}"
    """
    orders = frappe.db.sql(query, as_dict=True)
    if orders and len(orders) > 0:
        orders = [frappe.get_doc("WSE HR Order", order["name"]) for order in orders]

    person_info = {
        "person_id": person.name,
        "user_type": user_type,
        "wellspring_code": wellspring_code,
        "avatar": person.avatar,
        "full_name": person.full_name,
        "email": person.email,
        "phone_number": person.phone_number,
        "date_of_birth": person.date_of_birth,
    }
    if user_type == "Student":
        school_class = student_staff.get_current_class()
        if school_class:
            person_info["school_class_title"] = school_class.title
    else:
        person_info["department"] = student_staff.department

    return {"person": person_info, "orders": orders}


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_list_of_school_class_and_department(keyword):
    """API to get list of school class."""
    if not keyword.strip():
        frappe.throw("Keyword is required")

    current_school_year = SISSchoolYear.get_current_school_year()

    keyword = keyword.strip()
    keyword_slit = keyword.split(" ")
    or_filters = []
    for word in keyword_slit:
        or_filters.append(["short_title", "like", f"%{word}%"])

    school_classes = frappe.get_all(
        "SIS School Class",
        fields=["name", "title", "short_title", "school_year"],
        filters={"school_year": current_school_year},
        or_filters=or_filters,
        order_by="sequence_number",
    )

    departments = frappe.get_all(
        "SIS Department",
        fields=["name", "title_vn", "title_en", "short_title"],
        or_filters=[
            ["title_en", "like", f"%{keyword}%"],
            ["title_vn", "like", f"%{keyword}%"],
            ["short_title", "like", f"%{keyword}%"],
        ],
        order_by="short_title",
    )

    return {"school_classes": school_classes, "departments": departments}


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_school_class_students(school_class_id):
    """API to get list of students in a school class.

    school_class_id (str): School Class ID.
    """
    if not school_class_id:
        return []

    students = frappe.db.sql(
        """
            SELECT
                `tabSIS School Class Person`.name AS name,
                `tabSIS Person`.full_name AS full_name,
                `tabSIS Person`.date_of_birth AS date_of_birth,
                `tabSIS Student`.wellspring_student_code AS wellspring_code
            FROM
                `tabSIS School Class Person`
                JOIN `tabSIS Person` ON `tabSIS School Class Person`.person = `tabSIS Person`.name
                JOIN `tabSIS Student` ON `tabSIS School Class Person`.person = `tabSIS Student`.person
            WHERE
                `tabSIS School Class Person`.parent = %s
                AND `tabSIS School Class Person`.role = "Student"
                AND `tabSIS Student`.status = "Enabled"
            ORDER BY `tabSIS Person`.full_name ASC;
        """,
        (school_class_id,),
        as_dict=True,
    )
    return students


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_department_staffs(department_id):
    """API to get list of staffs in a department.

    department_id (str): Department ID.
    """
    if not department_id:
        return []

    staffs = frappe.db.sql(
        """
            SELECT
                `tabSIS Staff`.name AS name,
                `tabSIS Person`.full_name AS full_name,
                `tabSIS Person`.date_of_birth AS date_of_birth,
                `tabSIS Staff`.employee_code AS wellspring_code
            FROM
                `tabSIS Staff`
                JOIN `tabSIS Person` ON `tabSIS Staff`.person = `tabSIS Person`.name
            WHERE
                `tabSIS Staff`.department = %s
            ORDER BY `tabSIS Person`.full_name ASC;
        """,
        (department_id,),
        as_dict=True,
    )
    return staffs


@frappe.whitelist(allow_guest=True, methods=["POST"])
def submit_happy_run_order(**kwags):
    """API to submit Happy Run registration form.

    kwags (dict): Form data.
        full_name (str): Full Name.
        email (str): Email.
        mobile_number (str): Mobile Number.
        tickets (list): List of tickets.
            wellspring_code (str): Wellspring Code.
            full_name (str): Full Name.
            email (str): Email.
            ticket_type (str): Ticket Type (Happy Run or Well-being).
            distance (str): Distance (2.5 km or 5 km).
            shirt_size (str): Shirt Size (Size 1 to Size 7).
            bib (str): Bib.
    """
    full_name = kwags.get("full_name")
    email = kwags.get("email")
    mobile_number = kwags.get("mobile_number")
    tickets = kwags.get("tickets")

    if not full_name:
        frappe.throw("Full Name is required")
    if not email:
        frappe.throw("Email is required")
    if not mobile_number:
        frappe.throw("Mobile Number is required")
    if not tickets:
        frappe.throw("Tickets are required")

    # for ticket in tickets:
    #     if ticket.get("wellspring_code"):
    #         validate_wellspring_code(ticket.get("wellspring_code"))

    order = frappe.new_doc("WSE HR Order")
    order.full_name = full_name.title().strip()
    order.email = email.lower().strip()
    order.mobile_number = mobile_number.strip()
    order.tickets = []

    for ticket in tickets:
        doc = frappe.new_doc("WSE HR Ticket")
        doc.wellspring_code = ticket.get("wellspring_code")
        doc.full_name = ticket.get("full_name")
        doc.email = ticket.get("email")
        doc.ticket_type = ticket.get("ticket_type")
        doc.distance = ticket.get("distance")
        doc.shirt_size = ticket.get("shirt_size")
        doc.bib = ticket.get("bib")
        order.append("tickets", doc)

    order.insert()

    return order.as_dict()
