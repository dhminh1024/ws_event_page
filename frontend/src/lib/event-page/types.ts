import { EventVariable } from "@/app/nutrition-journey/types/variables";
import { WSEEvent } from "@/types/WellspringEventPage/WSEEvent";

export interface WSEEventResponse extends Omit<WSEEvent, "variables"> {
  variables: EventVariable;
}
