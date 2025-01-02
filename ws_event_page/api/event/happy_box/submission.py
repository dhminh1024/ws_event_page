import frappe
from frappe.handler import upload_file
from mimetypes import guess_type
from PIL import Image, ImageOps
import base64
import io


def get_challenge_info(submisison):
    challenge = frappe.get_doc("WSE HB Challenge", submisison.happy_box_challenge)
    return challenge.as_dict()


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_submission_by_wellspring_code(wellspring_code):
    submissions = frappe.get_all(
        "WSE HB Submission",
        filters={"wellspring_code": wellspring_code},
        fields="*",
    )

    if submissions and len(submissions) > 0:
        for submission in submissions:
            submission["happy_box_challenge"] = get_challenge_info(submission)

    return submissions


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_submission_in_gallery():
    submissions = frappe.get_all(
        "WSE HB Submission",
        filters={"add_to_gallery": 1},
        fields="*",
    )

    if submissions and len(submissions) > 0:
        for submission in submissions:
            submission["happy_box_challenge"] = get_challenge_info(submission)

    return submissions


@frappe.whitelist(allow_guest=True, methods=["POST"])
def create_happy_box_challenge_submission(**kwags):
    # validate data
    # wellspring_code must be valid
    wellspring_code = kwags.get("wellspring_code")
    if not wellspring_code:
        frappe.throw("Wellspring Code is required")
    user_type = kwags.get("user_type")
    if user_type not in ["Student", "Staff"]:
        frappe.throw("Invalid user type")
    full_name = kwags.get("full_name")
    if not full_name:
        frappe.throw("Full name is required")
    happy_box_challenge = kwags.get("happy_box_challenge")
    if not happy_box_challenge:
        frappe.throw("Happy Box Challenge is required")

    if user_type == "Student":
        student = frappe.get_value(
            "SIS Student",
            {"wellspring_student_code": wellspring_code},
            ["name", "full_name"],
            as_dict=True,
        )
        if not student:
            frappe.throw("Invalid Wellspring Code")
        if student.full_name != full_name:
            frappe.throw("Full name does not match with student record")
    else:
        staff = frappe.get_value(
            "SIS Staff",
            {"employee_code": wellspring_code},
            ["name", "full_name"],
            as_dict=True,
        )
        if not staff:
            frappe.throw("Invalid Wellspring Code")
        if staff.full_name != full_name:
            frappe.throw("Full name does not match with staff record")

    happy_box_challenge = frappe.get_value(
        "WSE HB Challenge", happy_box_challenge, "name"
    )
    if not happy_box_challenge:
        frappe.throw("Invalid Happy Box Challenge ID")

    # check if submission already exists
    submission = frappe.get_value(
        "WSE HB Submission",
        {
            "wellspring_code": wellspring_code,
            "full_name": full_name,
            "user_type": user_type,
            "happy_box_challenge": happy_box_challenge,
        },
        "*",
    )
    if submission:
        return submission

    submission = frappe.new_doc("WSE HB Submission")
    submission.update(
        {
            "full_name": full_name,
            "wellspring_code": wellspring_code,
            "user_type": user_type,
            "happy_box_challenge": happy_box_challenge,
        }
    )
    submission.save()

    # update number of submissions in challenge
    frappe.db.set_value(
        "WSE HB Challenge",
        happy_box_challenge,
        "number_of_submissions",
        frappe.db.get_value(
            "WSE HB Submission",
            {"happy_box_challenge": happy_box_challenge},
            "count(name)",
        ),
    )

    return submission


def upload_JPEG_wrt_EXIF(content, filename):
    """
    When a user uploads a JPEG file, we need to transpose the image based on the EXIF data.
    This is because the image is rotated when it is uploaded to the server.
    """
    content_type = guess_type(filename)[0]

    # if file format is JPEG, we need to transpose the image
    if content_type.startswith("image/jpeg"):
        with Image.open(io.BytesIO(content)) as image:
            # transpose the image
            transposed_image = ImageOps.exif_transpose(image)
            #  convert the image to bytes
            buffer = io.BytesIO()
            # save the image to the buffer
            transposed_image.save(buffer, format="JPEG")
            # get the value of the buffer
            buffer = buffer.getvalue()
    else:
        buffer = base64.b64decode(content)

    return frappe.get_doc(
        {
            "doctype": "File",
            "file_name": filename,
            "content": buffer,
            "attached_to_doctype": "WSE HB Submission",
            "attached_to_name": frappe.form_dict.docname,
            "is_private": 0,
            "attached_to_field": "image",
        }
    ).insert()


def clear_attachments(doctype, docname):
    attachments = frappe.get_all(
        "File", filters={"attached_to_doctype": doctype, "attached_to_name": docname}
    )
    for attachment in attachments:
        frappe.delete_doc("File", attachment.name, ignore_permissions=True)


@frappe.whitelist(allow_guest=True, methods=["POST"])
def upload_submission_photo():
    """
    Upload an image with submission data.
    """
    # Validation
    submission_id = frappe.form_dict.get("submission_id")
    if not submission_id:
        frappe.throw("Submission ID is required")
    submission = frappe.get_doc("WSE HB Submission", submission_id)

    # Clear old attachments
    clear_attachments("WSE HB Submission", submission_id)

    fileExt = ["jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "gif", "GIF", "webp", "WEBP"]

    frappe.form_dict.doctype = "WSE HB Submission"
    frappe.form_dict.fieldname = "file"
    frappe.form_dict.docname = frappe.form_dict.submission_id
    frappe.form_dict.is_private = 0

    files = frappe.request.files
    if "file" in files:
        file = files["file"]
        filename = file.filename
        """
        If the file is a JPEG, we need to transpose the image
        Else, we need to upload the file as is
        """
        if filename.endswith(".jpeg"):
            content = file.stream.read()
            file_doc = upload_JPEG_wrt_EXIF(content, filename)
        elif filename.endswith(tuple(fileExt)):
            file_doc = upload_file()

        else:
            frappe.throw("Invalid file format")
    else:
        return {"message": "No file uploaded"}

    submission.image = file_doc.file_url
    submission.save()

    return {"message": "success", "file_url": file_doc.file_url}
