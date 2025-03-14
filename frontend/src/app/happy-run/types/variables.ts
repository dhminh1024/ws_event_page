import { EventVariableBase, VariableType } from "@/lib/event-page/types"
import { WSEHRTicket } from "@/types/WellspringEventPage/WSEHRTicket"

export interface HREventVariable extends EventVariableBase {
   date_event_start?: VariableType
   event_email?: VariableType
   info_ticket_heading_vn?: VariableType
   info_ticket_heading_en?: VariableType 
   info_ticket_table_vn?: VariableType
   info_ticket_table_en?: VariableType
   info_ticket_table_desc_vn?: VariableType
   info_ticket_table_desc_en?: VariableType 
   tshirt_size_table_vn?: VariableType
   tshirt_size_table_en?: VariableType
   info_primary_user_heading_vn?: VariableType  
   info_primary_user_heading_en?: VariableType,
   info_guardian_user_heading_vn?: VariableType,
   info_guardian_user_heading_en?: VariableType,
   open_shirt_size_selection?: VariableType,
   policy_note_vn?: VariableType,
   policy_note_en?: VariableType,
   policy_content_vn?: VariableType,
   policy_content_en?: VariableType,
   hero_image?: VariableType,
   logo_happy_summer?: VariableType,
   logo_spring_in_my_hands?: VariableType,
   ticket_period_time_start?: VariableType,
   ticket_period_time_end?: VariableType,
   happy_run_date?: VariableType,
   teaser_embed_url?: VariableType,
   target_1_heading_vn?: VariableType,
   target_1_heading_en?: VariableType,
   target_1_desc_vn?: VariableType,
   target_1_desc_en?: VariableType,
   target_2_heading_vn?: VariableType,
   target_2_heading_en?: VariableType,
   target_2_desc_vn?: VariableType,
   target_2_desc_en?: VariableType,
   target_3_heading_vn?: VariableType,
   target_3_heading_en?: VariableType,
   target_3_desc_vn?: VariableType,
   target_3_desc_en?: VariableType,
   detailed_route_conent_vn?: VariableType,
   detailed_route_conent_en?: VariableType,
   timing_route_content_vn?: VariableType,
   timing_route_content_en?: VariableType,
   highlight_route_content_vn?: VariableType,
   highlight_route_content_en?: VariableType,
   item_bib?: VariableType
   item_bib_title_vn?: VariableType
   item_bib_title_en?: VariableType
   item_bib_desc_vn?: VariableType
   item_bib_desc_en?: VariableType
   item_tshirt?: VariableType
   item_tshirt_title_vn?: VariableType
   item_tshirt_title_en?: VariableType
   item_tshirt_desc_vn?: VariableType
   item_tshirt_desc_en?: VariableType
   item_medals?: VariableType
   item_medals_title_vn?: VariableType
   item_medals_title_en?: VariableType
   item_medals_desc_vn?: VariableType
   item_medals_desc_en?: VariableType
   item_hat?: VariableType
   item_hat_title_vn?: VariableType
   item_hat_title_en?: VariableType
   item_hat_desc_vn?: VariableType
   item_hat_desc_en?: VariableType
   item_bottle?: VariableType
   item_bottle_title_vn?: VariableType
   item_bottle_title_en?: VariableType
   item_bottle_desc_vn?: VariableType
   item_bottle_desc_en?: VariableType
   station_1_name_vn?: VariableType
   station_1_name_en?: VariableType
   station_1_desc_vn?: VariableType
   station_1_desc_en?: VariableType
   station_2_name_vn?: VariableType
   station_2_name_en?: VariableType
   station_2_desc_vn?: VariableType
   station_2_desc_en?: VariableType
   station_3_name_vn?: VariableType
   station_3_name_en?: VariableType
   station_3_desc_vn?: VariableType
   station_3_desc_en?: VariableType
   station_4_name_vn?: VariableType
   station_4_name_en?: VariableType
   station_4_desc_vn?: VariableType
   station_4_desc_en?: VariableType
   station_5_name_vn?: VariableType
   station_5_name_en?: VariableType
   faq_1_question_vn?: VariableType
   faq_1_question_en?: VariableType
   faq_1_answer_vn?: VariableType
   faq_1_answer_en?: VariableType
   faq_2_question_vn?: VariableType
   faq_2_question_en?: VariableType
   faq_2_answer_vn?: VariableType
   faq_2_answer_en?: VariableType
   faq_3_question_vn?: VariableType
   faq_3_question_en?: VariableType
   faq_3_answer_vn?: VariableType
   faq_3_answer_en?: VariableType
   faq_4_question_vn?: VariableType
   faq_4_question_en?: VariableType
   faq_4_answer_vn?: VariableType
   faq_4_answer_en?: VariableType
   faq_5_question_vn?: VariableType
   faq_5_question_en?: VariableType
   faq_5_answer_vn?: VariableType
   faq_5_answer_en?: VariableType
   faq_6_question_vn?: VariableType
   faq_6_question_en?: VariableType
   faq_6_answer_vn?: VariableType
   faq_6_answer_en?: VariableType
   faq_7_question_vn?: VariableType
   faq_7_question_en?: VariableType
   unit_1?: VariableType
   order_detail_desc_1_vn?: VariableType
   order_detail_desc_1_en?: VariableType
   order_detail_desc_2_vn?: VariableType
   order_detail_desc_2_en?: VariableType
   order_detail_bottom_1_vn?: VariableType
   order_detail_bottom_1_en?: VariableType
   order_detail_bottom_2_vn?: VariableType
   order_detail_bottom_2_en?: VariableType
   info_item_1_vn?: VariableType
   info_item_1_en?: VariableType
   info_item_2_vn?: VariableType
   info_item_2_en?: VariableType
   info_item_3_vn?: VariableType
   info_item_3_en?: VariableType
   info_item_4_vn?: VariableType
   info_item_4_en?: VariableType
   info_item_5_vn?: VariableType
   info_item_5_en?: VariableType
   wellspring_map_embed?: VariableType
   ticket_happy_run_detail_vn?: VariableType
   ticket_happy_run_detail_en?: VariableType
   ticket_well_being_detail_vn?: VariableType
   ticket_well_being_detail_en?: VariableType
   search_image_ai?: VariableType
   spring_in_my_hands_image?: VariableType
   spring_in_my_hands_top_vn?: VariableType
   spring_in_my_hands_top_en?: VariableType
   summer_tuition_link?: VariableType
   summer_camp_registration_link?: VariableType
   info_item_1_mb_vn?: VariableType
   info_item_1_mb_en?: VariableType
   info_item_2_mb_vn?: VariableType
   info_item_2_mb_en?: VariableType
   info_item_3_mb_vn?: VariableType
   info_item_3_mb_en?: VariableType
   info_item_4_mb_vn?: VariableType
   info_item_4_mb_en?: VariableType
   info_item_5_mb_vn?: VariableType
   info_item_5_mb_en?: VariableType
}

export interface HRUserInfo {
   person: {
      person_id: string
      user_type: string
      wellspring_code: string
      avatar: string
      full_name: string
      email: string | null
      phone_number: string | null
      date_of_birth: string
      school_class_title: string
      department: string
   }
   orders: WSEHRTicket[]
}