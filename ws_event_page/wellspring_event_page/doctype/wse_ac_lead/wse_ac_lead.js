// Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
// For license information, please see license.txt

frappe.ui.form.on("WSE AC Lead", {
  refresh(frm) {
    // hide the student_grade field in new form
    if (frm.is_new()) {
      frm.set_df_property("student_grade", "hidden", 1);
    }

    // add a action button to switch test slot
    let registerBtn = frm.add_custom_button("Register Test Slot", () => {
      // show a dialog to select the new test slot
      frappe.prompt(
        [
          {
            fieldname: "test_slot",
            label: "Test Slot",
            fieldtype: "Link",
            options: "WSE AC Test Slot",
            reqd: 1,
          },
          {
            fieldname: "send_email",
            label: "Send Email",
            fieldtype: "Check",
            default: 0,
          },
        ],
        (values) => {
          frappe.call({
            method:
              "ws_event_page.api.event.admission_checkin.lead.register_for_test",
            args: {
              lead_id: frm.doc.name,
              test_slot_id: values.test_slot,
              booking_id: frm.doc.booking_id,
              switch_slot: frm.doc.registered_slot ? true : false,
              send_email: values.send_email,
            },
            callback: (r) => {
              if (r.message) {
                frm.reload_doc();
                frappe.msgprint("Register slot successfully!");
              }
            },
          });
        },
        "Register Test Slot",
        "Register"
      );
    });

    registerBtn.addClass("btn-primary");

    // add a action button to check in test slot
    let checkInBtn = frm.add_custom_button("Check In", () => {
      frappe.call({
        method: "ws_event_page.api.event.admission_checkin.lead.test_checkin",
        args: {
          lead_id: frm.doc.name,
        },
        callback: (r) => {
          if (r.message) {
            frm.reload_doc();
            frappe.msgprint("Checked in successfully!");
          }
        },
      });
    });

    checkInBtn.addClass("btn-success");
    checkInBtn.css({
      "background-color": "#007bff",
      color: "#fff",
    });
  },
});
