import { createContext } from "react";
import { WSEHBChallengeResponse } from "./types";

export const HBChallengeContext = createContext<WSEHBChallengeResponse>(
  {} as WSEHBChallengeResponse
);
