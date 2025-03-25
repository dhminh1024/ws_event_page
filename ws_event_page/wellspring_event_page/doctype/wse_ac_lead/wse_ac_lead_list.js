// Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
// For license information, please see license.txt

frappe.listview_settings["WSE AC Lead"] = {
  onload(listview) {
    // listview.page.add_action_item("Send Confirmation Emails", () => {
    //   let names = [];
    //   $.each(listview.get_checked_items(), function (key, value) {
    //     names.push(value.name);
    //   });
    //   if (names.length === 0) {
    //     frappe.throw(__("No rows selected."));
    //   }
    //   send_confirmation_emails(names, listview);
    // });

    // listview.page.add_action_item("Send Invitation Emails", () => {
    //   let names = [];
    //   $.each(listview.get_checked_items(), function (key, value) {
    //     names.push(value.name);
    //   });
    //   if (names.length === 0) {
    //     frappe.throw(__("No rows selected."));
    //   }
    //   send_invitation_emails(names, listview);
    // });

    listview.page.add_action_item("Send Result Confirmation Emails", () => {
      let names = [];
      $.each(listview.get_checked_items(), function (key, value) {
        names.push(value.name);
      });
      if (names.length === 0) {
        frappe.throw(__("No rows selected."));
      }
      send_result_confirmation_email(names, listview);
    });
  },
  before_render() {
    // triggers before every render of list records
  },
  button: {
    show: function (doc) {
      return doc.reference_name;
    },
  },
};

function send_result_confirmation_email(names, listview) {
  // convert names to string
  names_str = names.join(",");
  frappe.confirm(
    "Are you sure you want to send the result confirmation emails?",
    function () {
      frappe.call({
        method:
          "ws_event_page.api.event.admission_checkin.lead.send_result_confirmation_emails",
        args: {
          lead_ids_str: names_str,
        },
        callback: function (r) {
          if (r.message) {
            message = r.message.message;
            frappe.msgprint(message);
            listview.refresh();
          }
        },
      });
    }
  );
}

function send_confirmation_emails(names, listview) {
  // convert names to string
  names_str = names.join(",");
  frappe.confirm(
    "Are you sure you want to send the confirmation emails?",
    function () {
      frappe.call({
        method:
          "ws_event_page.api.event.admission_checkin.lead.send_confirmation_emails",
        args: {
          lead_ids_str: names_str,
        },
        callback: function (r) {
          if (r.message) {
            message = r.message.message;
            frappe.msgprint(message);
            listview.refresh();
          }
        },
      });
    }
  );
}

function send_invitation_emails(names, listview) {
  // convert names to string
  names_str = names.join(",");
  frappe.confirm(
    "Are you sure you want to send the invitation emails?",
    function () {
      frappe.call({
        method:
          "ws_event_page.api.event.admission_checkin.lead.send_test_invitation_emails",
        args: {
          lead_ids_str: names_str,
        },
        callback: function (r) {
          if (r.message) {
            message = r.message.message;
            frappe.msgprint(message);
            listview.refresh();
          }
        },
      });
    }
  );
}
