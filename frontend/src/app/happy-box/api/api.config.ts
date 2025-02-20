export const FRAPPE_APIS = {
  HAPPY_BOX: {
    GET_USER_INFO: {
      METHOD_STRING: "ws_event_page.api.login.get_current_user_info",
      SWR_KEY: "get_current_user_info",
    },
    GET_CHALLENGE_BY_ID: {
      METHOD_STRING: "ws_event_page.api.login.get_current_user_info",
      SWR_KEY: "get_current_user_info",
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
    GET_GALLERY:{
      METHOD_STRING:"ws_event_page.api.event.happy_box.submission.get_submission_in_gallery",
      SWR_KEY: "get_submission_in_gallery"
    }
  }
};