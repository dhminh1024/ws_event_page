import { createContext } from "react";
import { PTSettingResponse } from "./types";

export const PTSettingContext = createContext<PTSettingResponse>(
  {} as PTSettingResponse
);
