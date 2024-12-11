import { WSESettings } from "@/types/WellspringEventPage/WSESettings";
import { useFrappeGetCall } from "frappe-react-sdk";
import React from "react";
import { SettingsContext } from "./settings-context";

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data } = useFrappeGetCall<{ message: WSESettings }>(
    "ws_event_page.api.auth.login.get_settings"
  );

  return (
    <SettingsContext.Provider value={data?.message || ({} as WSESettings)}>
      {children}
    </SettingsContext.Provider>
  );
};
