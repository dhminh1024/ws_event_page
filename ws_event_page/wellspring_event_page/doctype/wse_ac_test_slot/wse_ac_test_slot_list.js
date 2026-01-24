// Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
// For license information, please see license.txt

frappe.listview_settings["WSE AC Test Slot"] = {
  onload(listview) {
    // Add default filter for current event
    frappe.db
      .get_single_value("WSE AC Settings", "current_event")
      .then(function (current_event) {
        if (current_event) {
          listview.filter_area.set_standard_filter([
            ["WSE AC Test Slot", "ac_event", "=", current_event],
          ]);
        }
      });

    // Add action button to recalculate counts for selected slots
    listview.page.add_action_item(__("Recalculate Counts"), () => {
      let names = [];
      $.each(listview.get_checked_items(), function (key, value) {
        names.push(value.name);
      });
      if (names.length === 0) {
        frappe.throw(__("No rows selected."));
      }

      frappe.confirm(
        __("Recalculate counts for {0} selected slot(s)?", [names.length]),
        function () {
          frappe.call({
            method:
              "ws_event_page.api.event.admission_checkin.lead.recalculate_test_slot_counts",
            args: { slot_ids_str: names.join(",") },
            callback: function (r) {
              if (r.message) {
                frappe.msgprint(r.message.message);
                listview.refresh();
              }
            },
          });
        }
      );
    });
  },
};
