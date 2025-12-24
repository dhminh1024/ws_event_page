# Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
# For license information, please see license.txt

"""
Dashboard Chart Source for WSE AC Lead Category.
Groups leads by status for the current event.
"""

import frappe
from frappe.utils.dashboard import cache_source


def _get_current_event():
    """Get the current event from WSE AC Settings."""
    return frappe.db.get_single_value("WSE AC Settings", "current_event")


@frappe.whitelist()
@cache_source
def get_data(
    chart_name=None,
    chart=None,
    no_cache=None,
    filters=None,
    from_date=None,
    to_date=None,
    timespan=None,
    time_interval=None,
    heatmap_year=None,
) -> dict:
    """
    Returns lead count grouped by status for the current event.

    Returns:
        dict: Chart data with labels and datasets.
    """
    current_event = _get_current_event()
    query_filters = {"ac_event": current_event} if current_event else {}

    result = frappe.get_all(
        "WSE AC Lead",
        filters=query_filters,
        fields=["status", "count(*) as count"],
        group_by="status",
        order_by="status",
    )

    labels = [r.status for r in result]
    values = [r.count for r in result]

    return {
        "labels": labels,
        "datasets": [{"name": "Leads", "values": values}],
    }
