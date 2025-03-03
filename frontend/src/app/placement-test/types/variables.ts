import { EventVariableBase, VariableType } from "@/lib/event-page/types"

export interface ACEventVariable extends EventVariableBase {
   notice_vn?: VariableType
   notice_en?: VariableType
   footer_text_vn?: VariableType
   footer_text_en?: VariableType
}