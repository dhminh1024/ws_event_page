export const FRAPPE_APIS = {
  GET_USER_BY_CODE: {
    METHOD_STRING:
      "ws_event_page.api.event.happy_run.submission.check_wellspring_code",
    SWR_KEY: "check_wellspring_code",
  },
  GET_HR_SETTINGS: {
    METHOD_STRING:
      "ws_event_page.api.event.happy_run.setting.get_happy_run_settings",
    SWR_KEY: "get_happy_run_settings",
  },
  SEND_ORDER: {
    METHOD_STRING:
      "ws_event_page.api.event.happy_run.submission.submit_happy_run_order",
    SWR_KEY: "submit_happy_run_order",
  },
  GET_ORDER: {
    METHOD_STRING: "ws_event_page.api.event.happy_run.order.get_order_detail",
    SWR_KEY: "get_order_detail",
  },
  FIND_SCHOOL_CLASSES_DEPARTMENT: {
    METHOD_STRING:
      "ws_event_page.api.event.happy_run.submission.get_list_of_school_class_and_department",
    SWR_KEY: "get_list_of_school_class_and_department",
  },
  GET_STUDENTS_IN_CLASS: {
    METHOD_STRING:
      "ws_event_page.api.event.happy_run.submission.get_school_class_students",
    SWR_KEY: "get_school_class_students",
  },
  GET_STAFFS_IN_DEPARTMENT: {
    METHOD_STRING:
      "ws_event_page.api.event.happy_run.submission.get_department_staffs",
    SWR_KEY: "get_department_staffs",
  },
  CHECK_TICKETS: {
    METHOD_STRING: "ws_event_page.api.event.happy_run.ticket.get_ticket_count",
    SWR_KEY: "get_ticket_count",
  },
  CREATE_REGISTRATION: {
    METHOD_STRING:
      "ws_event_page.api.event.greatest_show.registration.create_registration",
    SWR_KEY: "create_registration",
  },
  UPLOAD_REGISTRATION_FILE: {
    METHOD_STRING:
      "ws_event_page.api.event.greatest_show.registration.upload_registration_file",
    SWR_KEY: "upload_registration_file",
  },
  GET_CURRENT_PROGRAM: {
    METHOD_STRING:
      "ws_event_page.api.event.greatest_show.program.get_current_program",
    SWR_KEY: "get_current_greatest_show_program",
  },
  GET_FINALISTS: {
    METHOD_STRING:
      "ws_event_page.api.event.greatest_show.voting.get_finalists",
    SWR_KEY: "get_greatest_show_finalists",
  },
  GET_VOTING_SETTINGS: {
    METHOD_STRING:
      "ws_event_page.api.event.greatest_show.voting.get_voting_settings",
    SWR_KEY: "get_greatest_show_voting_settings",
  },
  CAST_VOTE: {
    METHOD_STRING:
      "ws_event_page.api.event.greatest_show.voting.cast_vote",
    SWR_KEY: "cast_greatest_show_vote",
  },
  GET_USER: {
    METHOD_STRING:
      "ws_event_page.api.event.greatest_show.voting.get_user",
    SWR_KEY: "get_greatest_show_user",
  },
  VERIFY_GOOGLE_TOKEN: {
    METHOD_STRING:
      "ws_event_page.api.event.greatest_show.social_auth.verify_google_token",
    SWR_KEY: "verify_google_token",
  },
  SAVE_SOCIAL_USER: {
    METHOD_STRING:
      "ws_event_page.api.event.greatest_show.social_auth.save_social_user",
    SWR_KEY: "save_social_user",
  }
};
