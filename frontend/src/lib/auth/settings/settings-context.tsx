import { WSESettings } from "@/types/WellspringEventPage/WSESettings";
import { createContext } from "react";

export const SettingsContext = createContext<WSESettings>({} as WSESettings);
