// Dashboard Chart Source: WSE AC Lead Student Grade
frappe.provide('frappe.dashboards.chart_sources');

frappe.dashboards.chart_sources['WSE AC Lead Student Grade'] = {
	method: 'ws_event_page.wellspring_event_page.dashboard_chart_source.wse_ac_lead_student_grade.wse_ac_lead_student_grade.get_data',
	filters: []
};
