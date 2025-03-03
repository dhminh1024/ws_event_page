import { EventVariableBase, VariableType } from "@/lib/event-page/types"

export interface HBEventVariable extends EventVariableBase {
    date_start?: VariableType
    video_url?: VariableType
    gift_limit?: VariableType
}