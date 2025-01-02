import { WSEEvent } from "@/types/WellspringEventPage/WSEEvent";
import { useFrappeGetCall, useFrappeGetDoc } from "frappe-react-sdk";
import React from "react";
import { EventPageContext } from "./event-page-context";
import { WSEEventResponse } from "./types";
import FullPageLoaderTemplate from "@templates/full-page-loader.template";

interface EventPageProviderProps {
  eventUrl: string;
}

export const EventPageProvider: React.FC<
  React.PropsWithChildren<EventPageProviderProps>
> = ({ eventUrl, children }) => {
  
  const { data, isLoading, isValidating } = useFrappeGetCall<{
    message: WSEEventResponse;
  }>(
    "ws_event_page.api.event.event.get_event_page_data",
    { site_url: eventUrl },
    `get_event_page_data:${eventUrl}`,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    } // options
  );

  if (isLoading || isValidating) return <FullPageLoaderTemplate />;

  // if (!data || !data.message) return <h1>Error: Event Page Data not found!</h1>;

  return (
    <EventPageContext.Provider value={data?.message || { variables: {} } as WSEEventResponse}>
      {children}
    </EventPageContext.Provider>
  );
};
