// Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
// For license information, please see license.txt

frappe.ui.form.on("WSE GS Registration", {
  refresh(frm) {
    // Disable form if registration is cancelled
    if (frm.doc.status === "Cancelled") {
      frm.disable_save();
    }

    // Add buttons based on status
    if (frm.doc.status === "Waitting") {
      // Add Resend Confirmation Email button
      let resendConfirmationBtn = frm.add_custom_button(
        "Resend Confirmation Email",
        function () {
          frappe.confirm(
            "Bạn có chắc muốn gửi lại email xác nhận? | Are you sure you want to resend the confirmation email?",
            function () {
              frappe.call({
                method: "ws_event_page.api.event.greatest_show.registration.resend_confirmation_email",
                args: { registration_id: frm.doc.name },
                callback: function (r) {
                  if (r.message) {
                    frappe.msgprint(r.message.message);
                    frm.reload_doc();
                  }
                },
              });
            }
          );
        }
      );
      resendConfirmationBtn.addClass("btn-secondary");

      // Add Cancel Registration button
      let cancelBtn = frm.add_custom_button("Cancel Registration", function () {
        frappe.confirm(
          "Bạn có chắc muốn huỷ đăng ký này? | Are you sure you want to cancel this registration?",
          function () {
            frappe.call({
              method: "ws_event_page.api.event.greatest_show.registration.cancel_registration",
              args: { registration_id: frm.doc.name },
              callback: function (r) {
                if (r.message) {
                  frappe.msgprint(r.message.message);
                  frm.reload_doc();
                }
              },
            });
          }
        );
      });
      cancelBtn.addClass("btn-danger");
    } else if (frm.doc.status === "Approved") {
      // Add Resend Confirmation Email button for approved registrations
      let resendConfirmationBtn = frm.add_custom_button(
        "Resend Confirmation Email",
        function () {
          frappe.confirm(
            "Bạn có chắc muốn gửi lại email xác nhận? | Are you sure you want to resend the confirmation email?",
            function () {
              frappe.call({
                method: "ws_event_page.api.event.greatest_show.registration.resend_confirmation_email",
                args: { registration_id: frm.doc.name },
                callback: function (r) {
                  if (r.message) {
                    frappe.msgprint(r.message.message);
                    frm.reload_doc();
                  }
                },
              });
            }
          );
        }
      );
      resendConfirmationBtn.addClass("btn-secondary");
    }
  },
});
