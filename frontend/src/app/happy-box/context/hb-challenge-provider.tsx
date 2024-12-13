import { useFrappeGetCall } from "frappe-react-sdk";
import React from "react";
import { HBChallengeContext } from "./hb-challenge-context";
import { WSEHBChallengeExtended } from "./types";

export const HBChallengeListProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data, isLoading, isValidating } = useFrappeGetCall<{
    message: WSEHBChallengeExtended[];
  }>(
    "ws_event_page.api.event.happy_box.challenge.get_all_challenges",
    undefined,
    `get_happy_box_challenge_list`,
    {} // options
  );

  return (
    <HBChallengeContext.Provider
      value={data?.message ? { challenges: data.message } : { challenges: [] }}
    >
      {children}
    </HBChallengeContext.Provider>
  );
};
