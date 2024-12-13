import React from "react";
import { SettingsContext } from "./settings-context";

export const useSettings = () => React.useContext(SettingsContext);
