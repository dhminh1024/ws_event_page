import { createContext } from "react";
import { WSENJQuestionResponse } from "./types";

export const WSENJQuestionContext = createContext<WSENJQuestionResponse>(
  {} as WSENJQuestionResponse
);
