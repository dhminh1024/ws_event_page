import React from "react";
import { SettingsContext } from "./settings/settings-provider";

export const useSettings = () => React.useContext(SettingsContext);
