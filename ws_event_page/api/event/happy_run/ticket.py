import frappe
from ws_event_page.wellspring_event_page.doctype.wse_hr_ticket.wse_hr_ticket import (
    HRTicketStatus,
    HRTicketType,
)


def count_ticket_by_type(ticket_type):
    ticket_count = frappe.db.sql(
        """
            SELECT COUNT(*)
            FROM `tabWSE HR Ticket`
            WHERE 
                (status = %s
                OR status = %s)
                AND ticket_type = %s
        """,
        (
            HRTicketStatus.PENDING_PAYMENT.value,
            HRTicketStatus.PAID.value,
            ticket_type,
        ),
    )
    return ticket_count[0][0]


@frappe.whitelist(allow_guest=True, methods=["POST"])
def get_ticket_count():
    happy_run_ticket_count = count_ticket_by_type(HRTicketType.HAPPY_RUN.value)
    well_being_ticket_count = count_ticket_by_type(HRTicketType.WELL_BEING.value)
    limit_ticket_count = frappe.get_single("WSE HR Settings").limit_ticket_count

    allow_buy_ticket = True
    if limit_ticket_count:
        if (happy_run_ticket_count + well_being_ticket_count) >= limit_ticket_count:
            allow_buy_ticket = False

    return {
        "total_ticket_count": happy_run_ticket_count + well_being_ticket_count,
        "happy_run_count": happy_run_ticket_count,
        "well_being_count": well_being_ticket_count,
        "limit_ticket_count": limit_ticket_count,
        "allow_buy_ticket": allow_buy_ticket,
    }
