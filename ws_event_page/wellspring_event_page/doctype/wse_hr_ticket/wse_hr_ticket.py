# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
from enum import Enum


class HRTicketStatus(Enum):
    PENDING_PAYMENT = "Pending Payment"
    CANCELED = "Canceled"
    PAID = "Paid"
    REFUNDED = "Refunded"
    ATTENDED = "Attended"


class HRTicketType(Enum):
    HAPPY_RUN = "Happy Run"
    WELL_BEING = "Well-being"


class HRTicketDistance(Enum):
    TWO_POINT_FIVE_KM = "2.5 km"
    FIVE_KM = "5 km"


class HRTicketShirtSize(Enum):
    SIZE_1 = "Size 1"
    SIZE_2 = "Size 2"
    SIZE_3 = "Size 3"
    SIZE_4 = "Size 4"
    SIZE_5 = "Size 5"
    SIZE_6 = "Size 6"
    SIZE_7 = "Size 7"


class HRTicketCategory(Enum):
    PRIMARY = "Primary"
    COMPANION = "Companion"


class WSEHRTicket(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        bib: DF.Data | None
        category: DF.Literal["Primary", "Companion"]
        department: DF.Data | None
        distance: DF.Literal["2.5 km", "5 km"]
        email: DF.Data | None
        full_name: DF.Data | None
        parent: DF.Data
        parentfield: DF.Data
        parenttype: DF.Data
        person_id: DF.Link | None
        school_class_title: DF.Data | None
        shirt_size: DF.Literal["Size 1", "Size 2", "Size 3", "Size 4", "Size 5", "Size 6", "Size 7"]
        status: DF.Literal["Pending Payment", "Canceled", "Paid", "Refunded", "Attended"]
        ticket_price: DF.Currency
        ticket_type: DF.Literal["Happy Run", "Well-being"]
        wellspring_code: DF.Data | None
    # end: auto-generated types
    pass
