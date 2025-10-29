# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime


def build_order_name(doc):
    """
    Build order name with format WSEHRO{YY}{#####}.

    Format: WSEHRO{YY}{#####}
    - WSEHRO: Prefix for Wellspring Event Happy Run Order
    - YY: Last 2 digits of current year
    - #####: 5-digit sequential number (resets yearly)

    Example: WSEHRO25-00001, WSEHRO25-00002, etc.

    Args:
        doc: WSE HR Order document

    Returns:
        str: Generated order name
    """
    # Get current year (last 2 digits)
    current_year = datetime.now().year
    year_suffix = str(current_year)[-2:]  # Last 2 digits (e.g., "25" for 2025)

    # Count existing orders for this year
    # We search for orders that start with WSEHRO{YY}
    prefix = f"WSEHRO{year_suffix}"

    order_count = frappe.db.count(
        "WSE HR Order",
        filters={
            "name": ["like", f"{prefix}%"]
        }
    )

    # Generate new name with 5-digit counter
    new_name = f"{prefix}-{order_count + 1:05d}"

    # Check if name exists, increment if needed
    while frappe.db.exists("WSE HR Order", new_name):
        order_count += 1
        new_name = f"{prefix}-{order_count:05d}"

    return new_name
