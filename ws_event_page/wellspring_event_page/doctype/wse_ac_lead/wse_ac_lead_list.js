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

    // Add Sync from CRM Leads button
    listview.page.add_inner_button(__("Sync from CRM Leads"), () => {
      show_sync_dialog(listview);
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

function show_sync_dialog(listview) {
  let preview_data = [];

  const dialog = new frappe.ui.Dialog({
    title: __("Sync from CRM Leads"),
    size: "extra-large",
    fields: [
      {
        fieldname: "school_year",
        fieldtype: "Link",
        label: __("School Year"),
        options: "School Year",
        reqd: 1,
        get_query: function () {
          return {
            filters: { locked: 0 },
          };
        },
      },
      {
        fieldname: "grade",
        fieldtype: "Link",
        label: __("Grade"),
        options: "Educational Grade",
        description: __("Leave empty to load all grades"),
      },
      {
        fieldname: "preview_section",
        fieldtype: "Section Break",
        label: __("Preview"),
      },
      {
        fieldname: "preview_stats",
        fieldtype: "HTML",
        options: "<div id='preview-stats'></div>",
      },
      {
        fieldname: "preview_table",
        fieldtype: "HTML",
        options: "<div id='preview-table-container'></div>",
      },
    ],
    primary_action_label: __("Load"),
    primary_action: function () {
      if (preview_data.length === 0) {
        frappe.msgprint(__("Please click Preview first to load data"));
        return;
      }

      // Filter out leads marked as duplicate or without email
      const leads_to_sync = preview_data.filter(
        (l) => !l.is_duplicate && l.contact_email
      );

      if (leads_to_sync.length === 0) {
        frappe.msgprint(__("No valid leads to sync (all are duplicates or missing email)"));
        return;
      }

      frappe.confirm(
        __("Are you sure you want to create {0} AC Lead(s)?", [leads_to_sync.length]),
        function () {
          frappe.call({
            method:
              "ws_event_page.api.event.admission_checkin.lead.sync_leads_to_ac",
            args: {
              leads_json: JSON.stringify(leads_to_sync),
            },
            freeze: true,
            freeze_message: __("Creating AC Leads..."),
            callback: function (r) {
              if (r.message) {
                dialog.hide();
                show_sync_result(r.message, listview);
              }
            },
          });
        }
      );
    },
    secondary_action_label: __("Preview"),
    secondary_action: function () {
      const school_year = dialog.get_value("school_year");
      const grade = dialog.get_value("grade");

      if (!school_year) {
        frappe.msgprint(__("Please select a School Year"));
        return;
      }

      frappe.call({
        method:
          "ws_event_page.api.event.admission_checkin.lead.preview_leads_for_sync",
        args: {
          school_year: school_year,
          grade: grade || null,
        },
        freeze: true,
        freeze_message: __("Loading leads..."),
        callback: function (r) {
          if (r.message) {
            preview_data = r.message.leads;
            render_preview_table(r.message, dialog);
          }
        },
      });
    },
  });

  dialog.show();
}

function render_preview_table(data, dialog) {
  const stats_html = `
    <div style="margin-bottom: 10px;">
      <strong>Event:</strong> ${data.event.title} (${data.event.name})<br/>
      <strong>Total leads:</strong> ${data.total} |
      <span style="color: orange;">Duplicates (will skip): ${data.duplicates}</span> |
      <span style="color: green;">New: ${data.total - data.duplicates}</span>
    </div>
  `;
  $(dialog.fields_dict.preview_stats.$wrapper).find("#preview-stats").html(stats_html);

  if (data.leads.length === 0) {
    $(dialog.fields_dict.preview_table.$wrapper)
      .find("#preview-table-container")
      .html("<p>No leads found matching the criteria.</p>");
    return;
  }

  let table_html = `
    <div style="max-height: 400px; overflow-y: auto;">
      <table class="table table-bordered table-sm" style="font-size: 12px;">
        <thead style="position: sticky; top: 0; background: white;">
          <tr>
            <th>Status</th>
            <th>Reg. Number</th>
            <th>Student Name</th>
            <th>Grade</th>
            <th>Gender</th>
            <th>Parent Email</th>
            <th>Parent Name</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (const lead of data.leads) {
    const status = lead.is_duplicate
      ? '<span class="badge badge-warning" style="background-color: orange;">Duplicate</span>'
      : !lead.contact_email
      ? '<span class="badge badge-danger" style="background-color: red;">No Email</span>'
      : '<span class="badge badge-success" style="background-color: green;">New</span>';

    const row_class = lead.is_duplicate || !lead.contact_email ? 'style="opacity: 0.5;"' : "";

    table_html += `
      <tr ${row_class}>
        <td>${status}</td>
        <td>${lead.registration_number || ""}</td>
        <td>${lead.student_full_name || ""}</td>
        <td>${lead.student_grade || ""}</td>
        <td>${lead.student_gender || ""}</td>
        <td>${lead.contact_email || ""}</td>
        <td>${lead.parent_full_name || ""}</td>
        <td>${lead.mobile_number || ""}</td>
      </tr>
    `;
  }

  table_html += "</tbody></table></div>";

  $(dialog.fields_dict.preview_table.$wrapper)
    .find("#preview-table-container")
    .html(table_html);
}

function show_sync_result(result, listview) {
  let result_html = `
    <div>
      <h4>Sync Results</h4>
      <p>
        <span style="color: green;"><strong>Created:</strong> ${result.created_count}</span> |
        <span style="color: orange;"><strong>Skipped:</strong> ${result.skipped_count}</span> |
        <span style="color: red;"><strong>Failed:</strong> ${result.failed_count}</span>
      </p>
  `;

  if (result.created.length > 0) {
    result_html += `
      <details>
        <summary style="cursor: pointer; color: green;">Created (${result.created.length})</summary>
        <ul style="max-height: 150px; overflow-y: auto;">
          ${result.created.map((l) => `<li>${l.registration_number}</li>`).join("")}
        </ul>
      </details>
    `;
  }

  if (result.skipped.length > 0) {
    result_html += `
      <details>
        <summary style="cursor: pointer; color: orange;">Skipped (${result.skipped.length})</summary>
        <ul style="max-height: 150px; overflow-y: auto;">
          ${result.skipped.map((l) => `<li>${l.registration_number}: ${l.reason}</li>`).join("")}
        </ul>
      </details>
    `;
  }

  if (result.failed.length > 0) {
    result_html += `
      <details open>
        <summary style="cursor: pointer; color: red;">Failed (${result.failed.length})</summary>
        <ul style="max-height: 150px; overflow-y: auto;">
          ${result.failed.map((l) => `<li>${l.registration_number}: ${l.error}</li>`).join("")}
        </ul>
      </details>
    `;
  }

  result_html += "</div>";

  frappe.msgprint({
    title: __("Sync Complete"),
    message: result_html,
    indicator: result.failed_count > 0 ? "red" : "green",
  });

  listview.refresh();
}
