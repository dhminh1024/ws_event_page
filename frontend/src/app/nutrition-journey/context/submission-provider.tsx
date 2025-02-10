import { useFrappeGetCall } from "frappe-react-sdk";
import React, { useState } from "react";


import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { SubmissionContext } from "./submission-context";
import { WSESubmissionExtend } from "@/types/WellspringEventPage/WSEExtend";
import { useUser } from "./use-user";
import { FRAPPE_APIS } from "../api/api.config";

export const SubmissionProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user, isValid } = useUser();
  const { data, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: WSESubmissionExtend;
  }>(
    FRAPPE_APIS.GET_SUBMISSION_BY_CODE.METHOD_STRING,
    {
      wellspring_code: user?.wellspringCode,
    },
    user?.wellspringCode
      ? `${FRAPPE_APIS.GET_SUBMISSION_BY_CODE.SWR_KEY}_${user?.wellspringCode}`
      : null,
    {} // options
  );

  return (
    <SubmissionContext.Provider
      value={{
        submission: isValid ? data?.message : undefined,
        refresh: mutate,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};
