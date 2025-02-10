// Copyright (c) 2025, digital.learning@wellspringsaigon.edu.vn and contributors
// For license information, please see license.txt

frappe.ui.form.on("WSE NJ Submission", {
  refresh(frm) {
    // Create a button to show a dialog contains all images in the child table "images"
    // The dialog will show all images in the child table "images" in a slideshow with the question sequence number as the title
    frm.add_custom_button(__("Show Images"), () => {
      // sort images by sequence number, sequence number is string
      const images = frm.doc.images
        ? frm.doc.images.sort((a, b) =>
            a.sequence_number.localeCompare(b.sequence_number)
          )
        : [];
      const dialog = new frappe.ui.Dialog({
        title: __("Images"),
        fields: images.map((image) => {
          // image is a row in the child table "images" with fields "image_url" and "sequence_number"
          return {
            fieldname: image.sequence_number,
            fieldtype: "HTML",
            label: image.sequence_number,
            options: `<div><p style="text-align: center;"><b>${image.sequence_number}</b></p><img src="${image.image_url}" style="width: 100%;" /></div>`,
          };
        }),
      });
      dialog.show();
    });
  },
});
