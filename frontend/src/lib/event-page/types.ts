import { EventVariable } from "@/app/happy-box/types/variables";
import { WSEEvent } from "@/types/WellspringEventPage/WSEEvent";

export interface WSEEventResponse extends Omit<WSEEvent, "variables"> {
  variables: EventVariable;
}
