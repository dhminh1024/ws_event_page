
import { HBEventVariable } from "@/app/happy-box/types/variables";
import { HREventVariable } from "@/app/happy-run/types/variables";
import { WSEEvent } from "@/types/WellspringEventPage/WSEEvent";

export type VariableType = {
  value:string
}

export type EventVariableBase = {
    logo_wellspring_primary?: VariableType
    logo_wellspring_white?: VariableType
    logo_happy_journey?: VariableType
    wellspring_name?: VariableType
    wellspring_hanoi_hotline?: VariableType
    wellspring_hanoi_admissions_hotline?: VariableType
    wellspring_hanoi_admissions_email?: VariableType
    wellspring_website?: VariableType
    wellspring_hanoi_address?: VariableType
    wellspring_saigon_hotline?: VariableType
    wellspring_saigon_website?: VariableType
    wellspring_saigon_admissions_hotline?: VariableType
    wellspring_saigon_admissions_email?: VariableType
    wellspring_saigon_address?: VariableType
    title_event_vn?: VariableType
    title_event_en?: VariableType
    slogan_event_vn?: VariableType
    slogan_event_en?: VariableType
}

export interface WSEEventResponse extends Omit<WSEEvent, "variables"> {
  variables: HBEventVariable & HREventVariable;
}
