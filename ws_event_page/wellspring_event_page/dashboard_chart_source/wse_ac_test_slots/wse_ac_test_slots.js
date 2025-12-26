// Dashboard Chart Source: WSE AC Test Slots
frappe.provide('frappe.dashboards.chart_sources');

frappe.dashboards.chart_sources['WSE AC Test Slots'] = {
	method: 'ws_event_page.wellspring_event_page.dashboard_chart_source.wse_ac_test_slots.wse_ac_test_slots.get_data',
	filters: []
};
