
import { HBEventVariable } from "@/app/happy-box/types/variables";
import { HREventVariable } from "@/app/happy-run/types/variables";
import { EventVariable } from "@/app/nutrition-journey/types/variables";
import { ACEventVariable } from "@/app/placement-test/types/variables";
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
    event_title_vn?: VariableType
    event_title_en?: VariableType
    event_slogan_vn?: VariableType
    event_slogan_en?: VariableType
    event_name?: VariableType
}

export interface WSEEventResponse extends Omit<WSEEvent, "variables"> {
  variables: HBEventVariable & HREventVariable & ACEventVariable & Record<string, VariableType>;
  mutate: any;
}
