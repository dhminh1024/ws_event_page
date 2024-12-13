import { WSEEvent } from "@/types/WellspringEventPage/WSEEvent";

export interface WSEEventResponse extends Omit<WSEEvent, "variables"> {
  variables: { [key: string]: any };
}
