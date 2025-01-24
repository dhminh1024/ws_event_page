import { useFrappeGetCall } from "frappe-react-sdk";
import React, { useState } from "react";

import { WSEHBSubmissionExtend } from "./types";
import { FRAPPE_APIS } from "@happy-box/api/api.config";
import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { HBSubmissionsContext } from "./hb-submission-context";

export const HBSubmissionListProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuthWSCode();
  const { data, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: WSEHBSubmissionExtend[];
  }>(
    FRAPPE_APIS.GET_HB_SUBMISSIONS_BY_USER.METHOD_STRING,
    {
      wellspring_code: user?.userData.wellspringCode,
    },
    user?.userData.wellspringCode
      ? `${FRAPPE_APIS.GET_HB_SUBMISSIONS_BY_USER.SWR_KEY}_${user?.userData.wellspringCode}`
      : null,
    {} // options
  );
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  return (
    <HBSubmissionsContext.Provider
      value={{
        submissions: data?.message || [],
        refresh: mutate,
        showThankYouModal: showThankYouModal,
        setShowThankYouModal,
      }}
    >
      {children}
    </HBSubmissionsContext.Provider>
  );
};
