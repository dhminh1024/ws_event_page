// Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
// For license information, please see license.txt

frappe.ui.form.on("WSE AC Lead", {
  refresh(frm) {
    // hide the student_grade field in new form
    if (frm.is_new()) {
      frm.set_df_property("student_grade", "hidden", 1);
    }
  },
});
