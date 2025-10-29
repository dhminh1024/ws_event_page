import { createContext } from "react";
import { HRSettingResponse } from "./types";

export const HRSettingContext = createContext<HRSettingResponse>(
  {} as HRSettingResponse
);
