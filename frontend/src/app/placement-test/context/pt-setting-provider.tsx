import { useFrappeGetCall } from "frappe-react-sdk";
import React, { useState } from "react";

import { FRAPPE_APIS } from "../api/api.config";
import { WSEACSettings } from "../../../types/WellspringEventPage/WSEACSettings";
import { PTSettingContext } from "./pt-setting-context";

export const PTSettingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: WSEACSettings;
  }>(
    FRAPPE_APIS.GET_AC_SETTINGS.METHOD_STRING,
    {},
    FRAPPE_APIS.GET_AC_SETTINGS.SWR_KEY,
    {} // options
  );

  return (
    <PTSettingContext.Provider value={{ settings: data?.message }}>
      {children}
    </PTSettingContext.Provider>
  );
};
