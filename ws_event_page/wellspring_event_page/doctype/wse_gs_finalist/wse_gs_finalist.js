// Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
// For license information, please see license.txt

frappe.ui.form.on("WSE GS Finalist", {
	refresh(frm) {
		if (!frm.is_new()) {
			frm.add_custom_button(__("Recalculate Vote Count"), function () {
				frappe.call({
					method: "ws_event_page.wellspring_event_page.doctype.wse_gs_finalist.wse_gs_finalist.recalculate_vote_count",
					args: { finalist_id: frm.doc.name },
					callback: function (r) {
						if (r.message) {
							frappe.msgprint(
								__("Vote count updated to: {0}", [r.message.vote_count])
							);
							frm.reload_doc();
						}
					},
				});
			});
		}
	},
});
