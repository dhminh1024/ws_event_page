import frappe
from ws_event_page.api.utils.validation import validate_wellspring_code


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
            person_info["school_class_title"].school_class_title = school_class.title
    else:
        person_info["department"] = student_staff.department

    return {"person": person_info, "orders": orders}


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
