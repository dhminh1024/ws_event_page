import { createContext } from "react";
import { WSEHBSubmissionResponse } from "./types";

export const HBSubmissionsContext = createContext<WSEHBSubmissionResponse>(
  {} as WSEHBSubmissionResponse
);
