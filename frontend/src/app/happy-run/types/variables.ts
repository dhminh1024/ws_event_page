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
   policy_content_en?: VariableType
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