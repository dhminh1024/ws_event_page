import { useFrappeGetCall } from "frappe-react-sdk";
import React, { useState } from "react";
import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { HRSettingContext } from "./hr-setting-context";
import { WSEHRSettings } from "@/types/WellspringEventPage/WSEHRSettings";
import { FRAPPE_APIS } from "@happy-run/api/api.config";

export const HRSettingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: WSEHRSettings;
  }>(
    FRAPPE_APIS.GET_HR_SETTINGS.METHOD_STRING,
    {},
    FRAPPE_APIS.GET_HR_SETTINGS.SWR_KEY,
    {} // options
  );

  return (
    <HRSettingContext.Provider
      value={{
        settings: data?.message,
      }}
    >
      {children}
    </HRSettingContext.Provider>
  );
};
