import { createContext } from "react";
import { WSEEventResponse } from "./types";

export const EventPageContext = createContext<WSEEventResponse>(
  {} as WSEEventResponse
);
