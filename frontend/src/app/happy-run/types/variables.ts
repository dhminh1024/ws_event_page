import { EventVariableBase, VariableType } from "@/lib/event-page/types"

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
   info_primary_user_heading_en?: VariableType
}