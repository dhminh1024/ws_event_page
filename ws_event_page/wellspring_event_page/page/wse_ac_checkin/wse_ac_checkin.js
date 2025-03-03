frappe.pages["wse-ac-checkin"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "WSE AC Checkin",
    single_column: true,
    card_layout: true,
  });

  $(
    "<div class='lead-info' style='min-height: 300px; padding: 15px;'></div>"
  ).appendTo(page.main);

  new WSEACCheckin(wrapper);
};

class WSEACCheckin {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.page = wrapper.page;
    this.body = $(this.wrapper).find(".lead-info");
    // this.page.main.find(".lead-info").html("Hello World");

    this.setup_page();
  }

  setup_page() {
    // this.page.set_primary_action("Checkin", () => this.checkin());
    // this.page.set_secondary_action("Refresh", () => this.refresh());
    this.show_reset_button();
    this.lead_select = this.page.add_field({
      label: "Registration Number",
      fieldtype: "Data",
      fieldname: "lead_select",
      // get_query: function () {
      //   return {
      //     filters: {
      //       status: "New",
      //     },
      //   };
      // },
      // change: () => this.refresh(),
      // keyPress: (e) => {
      //   if (e.keyCode === 13) {
      //     // this.refresh();
      //     alert("Enter key pressed");
      //   }
      // },
      // change: function () {
      //   frappe.set_route("wse-ac-checkin", this.get_value());
      // },
    });
    $(this.lead_select.input).on("keypress", (e) => {
      if (e.keyCode === 13) {
        this.refresh();
        e.target.select();
      }
    });
    // Select all on Focus
    $(this.lead_select.input).on("focus", function () {
      $(this).select();
    });

    // this.set_from_route();
    setTimeout(() => {
      this.refresh();
    }, 500);
  }

  set_from_route() {
    if (!this.lead_select) {
      // field not yet loaded, call again after a bit
      setTimeout(() => {
        this.set_from_route();
      }, 500);
      return;
    }

    let route = frappe.get_route();
    if (route.length > 1) {
      this.lead_select.set_value(route[1]);
    }
    this.refresh();
  }

  get_lead_id() {
    return this.lead_select.get_value();
  }

  set_empty_message(message) {
    this.body.html(`
		<div class="text-muted flex justify-center align-center" style="min-height: 300px;">
			<p class='text-muted'>
				${message}
			</p>
		</div>`);
  }

  focus_on_input() {
    $(this.lead_select.input).focus();
  }

  focus_on_secondary_action() {
    this.page.main.find(".btn-secondary").focus();
  }

  focus_on_primary_action() {
    this.page.main.find(".btn-primary").focus();
  }

  refresh() {
    this.page.clear_primary_action();

    if (!this.lead_select) {
      return this.set_empty_message("Loading");
    }

    let lead_id = this.get_lead_id();

    if (!lead_id) {
      this.set_empty_message("Please enter a registration number");
      this.focus_on_input();
      return;
    }

    frappe.db
      .get_doc("WSE AC Lead", lead_id)
      .then((doc) => {
        this.lead_doc = doc;
        this.render();
      })
      .catch((e) => {
        this.lead_doc = null;
        this.set_empty_message("Lead not found");
      });
  }

  render() {
    if (!this.lead_doc) {
      return this.set_empty_message("No data found");
    }

    if (this.lead_doc.status !== "Checked in") {
      this.set_empty_message(
        `Số báo danh <b>${this.lead_doc.registration_number}</b> đã được check in thành công!`
      );
      this.focus_on_secondary_action();
      return;
    }

    this.show_checkin_button();
    this.show_doctype_details();
    this.focus_on_primary_action();
  }

  show_doctype_details() {
    let html = `
			<div class="flex justify-center align-center" style="min-height: 300px;">
				<div class="col col-6">
				<div class="form-group row">
						<label class="control-label col-sm-4">Status</label>
						<div class="control-input font-weight-bold col-sm-8">${this.lead_doc.status}</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-sm-4">Registration Number</label>
						<div class="control-input font-weight-bold col-sm-8">${this.lead_doc.registration_number}</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-sm-4">Student Full Name</label>
						<div class="control-input font-weight-bold col-sm-8">${this.lead_doc.student_full_name}</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-sm-4">Student Grade</label>
						<div class="control-input font-weight-bold col-sm-8">${this.lead_doc.student_grade}</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-sm-4">Parent Full Name</label>
						<div class="control-input font-weight-bold col-sm-8">${this.lead_doc.parent_full_name}</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-sm-4">Contact Email</label>
						<div class="control-input font-weight-bold col-sm-8">${this.lead_doc.contact_email}</div>
					</div>
					<div class="form-group row">
						<label class="control-label col-sm-4">Mobile Number</label>
						<div class="control-input font-weight-bold col-sm-8">${this.lead_doc.mobile_number}</div>
					</div>
				</div>
			</div>
		`;
    this.body.html(html);
  }

  show_reset_button() {
    this.page.set_secondary_action("Reset", () => {
      this.lead_select.set_value("");
      this.lead_doc = null;
      console.log(this.lead_select);
      this.page.main.find("input.input-with-feedback").focus();
      setTimeout(() => {
        this.refresh();
      }, 500);
    });
  }

  show_checkin_button() {
    this.page.set_primary_action("Check In", () => {
      frappe.call({
        method: "ws_event_page.api.event.admission_checkin.lead.lead_checkin",
        args: {
          lead_id: this.lead_doc.name,
        },
        callback: (r) => {
          // if (r.message) {
          //   frappe.msgprint(r.message);
          // }
          this.refresh();
        },
      });
    });
  }
}
//   let primaryBtn = page.set_primary_action("Checkin", function () {
//     checkin();
//   });
//   let refreshBtn = page.set_secondary_action("Refresh", () => refresh());

//   let checkin = function () {
//     frappe.call({
//       method: "ws_event_page.api.event.admission_checkin.lead.checkin",
//       callback: function (r) {
//         if (r.message) {
//           frappe.msgprint(r.message);
//         }
//       },
//     });
//   };

//   let refresh = function () {
//     window.location.reload();
//   };

//   // body
//   let field = page.add_field({
//     label: "Registration Number",
//     fieldtype: "Data",
//     fieldname: "registration_number",
//     keyDown: function (e) {
//       if (e.keyCode == 13) {
//         alert(field.get_value());
//       }
//     },
//   });
// };
