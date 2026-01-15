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
  },
};
