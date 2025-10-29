# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime


def build_registration_name(doc):
    """
    Build registration name with format WSEGSO{YY}{#####}.

    Format: WSEGSO{YY}{#####}
    - WSEGSO: Prefix for Wellspring Event Greatest Show Order
    - YY: Last 2 digits of current year
    - #####: 5-digit sequential number (resets yearly)

    Example: WSEGSO25-00001, WSEGSO25-00002, etc.

    Args:
        doc: WSE GS Registration document

    Returns:
        str: Generated registration name
    """
    # Get current year (last 2 digits)
    current_year = datetime.now().year
    year_suffix = str(current_year)[-2:]  # Last 2 digits (e.g., "25" for 2025)

    # Count existing registrations for this year
    # We search for registrations that start with WSEGSO{YY}
    prefix = f"WSEGSO{year_suffix}"

    registration_count = frappe.db.count(
        "WSE GS Registration",
        filters={
            "name": ["like", f"{prefix}%"]
        }
    )

    # Generate new name with 5-digit counter
    new_name = f"{prefix}-{registration_count + 1:05d}"

    # Check if name exists, increment if needed
    while frappe.db.exists("WSE GS Registration", new_name):
        registration_count += 1
        new_name = f"{prefix}-{registration_count:05d}"

    return new_name
