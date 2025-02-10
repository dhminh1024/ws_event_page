import { createContext } from "react";
import { WSESubmissionResponse } from "./types";

export const SubmissionContext = createContext<WSESubmissionResponse>(
  {} as WSESubmissionResponse
);
