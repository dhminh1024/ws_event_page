// Dashboard Chart Source: WSE AC Lead Category
frappe.provide('frappe.dashboards.chart_sources');

frappe.dashboards.chart_sources['WSE AC Lead Category'] = {
	method: 'ws_event_page.wellspring_event_page.dashboard_chart_source.wse_ac_lead_category.wse_ac_lead_category.get_data',
	filters: []
};
