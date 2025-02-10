export const FRAPPE_APIS = {
  GET_USER_INFO: {
    METHOD_STRING: "ws_event_page.api.auth.login.get_student_by_wellspring_code",
    SWR_KEY: "get_student_by_wellspring_code",
  },
  GET_QUESTIONS: {
    METHOD_STRING: "ws_event_page.api.event.nutrition_journey.question.get_all_questions",
    SWR_KEY: "get_all_questions",
  },
  CREATE_NJ_SUBMISSION: {
    METHOD_STRING: "ws_event_page.api.event.nutrition_journey.submission.create_nutrition_journey_submission",
    SWR_KEY: "create_nutrition_journey_submission",
  },
  UPLOAD_NJ_SUBMISSION_PHOTO: {
    METHOD_STRING: "ws_event_page.api.event.nutrition_journey.submission.upload_submission_photo",
    SWR_KEY: "upload_submission_photo",
  },
  GET_SUBMISSION_BY_CODE: {
    METHOD_STRING: "ws_event_page.api.event.nutrition_journey.submission.get_submission_by_wellspring_code",
    SWR_KEY: "get_submission_by_wellspring_code",
  },
  GET_GALLERY:{
    METHOD_STRING:"ws_event_page.api.event.happy_box.submission.get_submission_in_gallery",
    SWR_KEY: "get_submission_in_gallery"
  }
};
