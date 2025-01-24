import frappe
from frappe.handler import upload_file
from mimetypes import guess_type
from PIL import Image, ImageOps
import base64
import io


def get_question_info(submisison):
    question = frappe.get_doc("WSE NJ Question", submisison.question)
    return question.as_dict()


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_submission_by_wellspring_code(wellspring_code):
    submissions = frappe.get_all(
        "WSE NJ Submission",
        filters={"wellspring_code": wellspring_code},
        fields="name",
    )
    if submissions and len(submissions) > 0:
        submission = frappe.get_doc("WSE NJ Submission", submissions[0].name).as_dict()

        # sort images by sequence number
        if isinstance(submission.images, list) and len(submission.images) > 0:
            submission.images = sorted(
                submission.images, key=lambda x: x.sequence_number
            )

            # get question info
            for image in submission.images:
                image["question"] = get_question_info(image)
    else:
        return []

    return submission


@frappe.whitelist(allow_guest=True, methods=["POST"])
def create_nutrition_journey_submission(**kwags):
    # validate data
    # wellspring_code must be valid
    wellspring_code = kwags.get("wellspring_code")
    if not wellspring_code:
        frappe.throw("Wellspring Code is required")

    try:
        student = frappe.get_doc(
            "SIS Student",
            {"wellspring_student_code": wellspring_code},
        )
        current_class = student.get_current_class()
    except:
        frappe.throw("Invalid Wellspring Code")

    # check if submission already exists
    submission = frappe.get_value(
        "WSE NJ Submission",
        {
            "wellspring_code": wellspring_code,
            "student": student.name,
        },
        "*",
    )
    if submission:
        return submission

    submission = frappe.new_doc("WSE NJ Submission")
    submission.update(
        {
            "wellspring_code": wellspring_code,
            "student": student.name,
            "current_class": current_class.title,
        }
    )
    submission.save()

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
            "attached_to_doctype": "WSE NJ Submission",
            "attached_to_name": frappe.form_dict.docname,
            "is_private": 0,
            "attached_to_field": "image",
        }
    ).insert()


def clear_attachments(doctype, docname, file_url):
    attachments = frappe.get_all(
        "File",
        filters={
            "attached_to_doctype": doctype,
            "attached_to_name": docname,
            "file_url": file_url,
        },
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
    submission = frappe.get_doc("WSE NJ Submission", submission_id)

    question_id = frappe.form_dict.get("question_id")
    if not question_id:
        frappe.throw("Question ID is required")
    question = frappe.get_doc("WSE NJ Question", question_id)

    image_sequence_number = frappe.form_dict.get("image_sequence_number")
    if not image_sequence_number:
        frappe.throw("Image Sequence Number is required")
    try:
        image_sequence_number = int(image_sequence_number)
    except:
        frappe.throw("Image Sequence Number must be an integer")
    image_sequence_number = f"{question.sequence_number}.{image_sequence_number:02}"

    # Clear old attachments
    # clear_attachments("WSE NJ Submission", submission_id)

    fileExt = ["jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "gif", "GIF", "webp", "WEBP"]

    frappe.form_dict.doctype = "WSE NJ Submission"
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

    is_image_exists = False
    if isinstance(submission.images, list) and len(submission.images) > 0:
        for image in submission.images:
            if (image.question == question_id) and (
                image.sequence_number == image_sequence_number
            ):
                submission_image = image
                is_image_exists = True
                break
    else:
        submission.images = []

    if not is_image_exists:
        submission_image = frappe.new_doc("WSE NJ Submission Image")
        submission_image.update(
            {
                "question": question_id,
                "sequence_number": image_sequence_number,
                "image_url": file_doc.file_url,
            }
        )
        submission.images.append(submission_image)
    else:
        if (
            submission_image.image_url
            and submission_image.image_url != file_doc.file_url
        ):
            clear_attachments(
                "WSE NJ Submission", submission_id, submission_image.image_url
            )
            submission_image.update({"image_url": file_doc.file_url})
    submission.save()

    return {"message": "success", "file_url": file_doc.file_url}
