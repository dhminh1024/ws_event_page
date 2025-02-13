export const FRAPPE_APIS = {
  GET_USER_INFO: {
    METHOD_STRING: "ws_event_page.api.login.get_current_user_info",
    SWR_KEY: "get_current_user_info",
  },
  GET_HR_SETTINGS: {
    METHOD_STRING: "ws_event_page.api.event.happy_run.setting.get_happy_run_settings",
    SWR_KEY: "get_happy_run_settings",
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
  
  GET_GALLERY:{
    METHOD_STRING:"ws_event_page.api.event.happy_box.submission.get_submission_in_gallery",
    SWR_KEY: "get_submission_in_gallery"
  }
};
