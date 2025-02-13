// Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
// For license information, please see license.txt

frappe.ui.form.on("WSE HR Order", {
  refresh(frm) {
    // if editing form, disable edit tickets
    if (!frm.is_new()) {
      frm.set_df_property("full_name", "read_only", 1);
      frm.set_df_property("email", "read_only", 1);
      frm.set_df_property("mobile_number", "read_only", 1);
      // frm.fields_dict.tickets.grid.toggle_enable("full_name", false);
      // frm.fields_dict.tickets.grid.toggle_enable("email", false);
      // frm.fields_dict.tickets.grid.toggle_enable("wellspring_code", false);
      // frm.fields_dict.tickets.grid.toggle_enable("ticket_type", false);
      // frm.fields_dict.tickets.grid.toggle_enable("shirt_size", false);
      // frm.fields_dict.tickets.grid.toggle_enable("distance", false);
      // frm.fields_dict.tickets.grid.toggle_enable("bib", false);
      // frm.fields_dict.tickets.grid.wrapper.find(".grid-add-row").hide();

      if (frm.doc.status === "Canceled") {
        frm.disable_save();
      }

      if (frm.doc.status === "Pending Payment") {
        let paymentConfirmBtn = frm.add_custom_button(
          "Confirm Payment",
          function () {
            frappe.call({
              method: "ws_event_page.api.event.happy_run.order.confirm_payment",
              args: {
                order_id: frm.doc.name,
              },
              callback: function (r) {
                if (r.message) {
                  frappe.msgprint(
                    "Payment confirmed, an email has been sent to the customer."
                  );
                  frm.reload_doc();
                }
              },
            });
          }
        );

        paymentConfirmBtn.addClass("btn-success");
        paymentConfirmBtn.css({
          "background-color": "#007bff",
          color: "#fff",
        });

        let resendOrderConfirmationBtn = frm.add_custom_button(
          "Resend Order Confirmation Email",
          function () {
            // Prompt user to confirm the action
            frappe.confirm(
              "Are you sure you want to resend the confirmation email?",
              function () {
                frappe.call({
                  method:
                    "ws_event_page.api.event.happy_run.order.resend_order_confirmation_email",
                  args: {
                    order_id: frm.doc.name,
                  },
                  callback: function (r) {
                    if (r.message) {
                      frappe.msgprint(
                        "Order Confirmation Email has been sent to the customer."
                      );
                      frm.reload_doc();
                    }
                  },
                });
              }
            );
          }
        );

        resendOrderConfirmationBtn.addClass("btn-secondary");

        cancelBtn = frm.add_custom_button("Cancel Order", function () {
          // Prompt user to confirm the action
          frappe.confirm(
            "Are you sure you want to cancel this order?",
            function () {
              frappe.call({
                method: "ws_event_page.api.event.happy_run.order.cancel_order",
                args: {
                  order_id: frm.doc.name,
                },
                callback: function (r) {
                  if (r.message) {
                    frappe.msgprint("Order has been canceled.");
                    frm.reload_doc();
                  }
                },
              });
            }
          );
        });

        cancelBtn.addClass("btn-danger");
      }
    }
  },
});
