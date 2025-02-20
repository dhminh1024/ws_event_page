export const FRAPPE_APIS = {
  GET_USER_BY_CODE: {
    METHOD_STRING: "ws_event_page.api.event.happy_run.submission.check_wellspring_code",
    SWR_KEY: "check_wellspring_code",
  },
  SEND_ORDER: {
    METHOD_STRING: "ws_event_page.api.event.happy_run.submission.submit_happy_run_order",
    SWR_KEY: "submit_happy_run_order",
  },
  CREATE_HB_SUBMISSION: {
    METHOD_STRING: "ws_event_page.api.event.happy_box.submission.create_happy_box_challenge_submission",
    SWR_KEY: "create_happy_box_challenge_submission",
  },
  UPLOAD_HB_SUBMISSION_PHOTO: {
    METHOD_STRING: "ws_event_page.api.event.happy_box.submission.upload_submission_photo",
    SWR_KEY: "upload_submission_photo",
  },
  GET_HB_SUBMISSIONS_BY_USER: {
    METHOD_STRING: "ws_event_page.api.event.happy_box.submission.get_submission_by_wellspring_code",
    SWR_KEY: "get_submission_by_wellspring_code",
  },
  GET_ORDER:{
    METHOD_STRING:"ws_event_page.api.event.happy_run.order.get_order_detail",
    SWR_KEY: "get_order_detail"
  }
};
