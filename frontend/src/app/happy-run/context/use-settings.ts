import { useContext } from "react";
import { HRSettingContext } from "./hr-setting-context";

export const useHRSettings = () => useContext(HRSettingContext);
