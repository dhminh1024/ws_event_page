import { useFrappeGetCall } from "frappe-react-sdk";
import type { EventListResponse } from "../types/kdd.types";

/**
 * Parameters for filtering events list
 */
export interface ListEventsParams {
  /** Filter by kindergarten name */
  kindergarten?: string;
  /** Filter by registration status: "1" for open, "0" for closed */
  registration_open?: "1" | "0";
}

/**
 * Custom hook to fetch list of kindergarten demo day visit events
 *
 * @param params - Optional filters for kindergarten and registration status
 * @param enabled - Whether to enable the query (default: true)
 * @returns SWR response with events list, error, loading states, and mutate function
 *
 * @example
 * ```tsx
 * // Get all events
 * const { events, isLoading } = useListEvents();
 *
 * // Get events with registration open
 * const { events, isLoading } = useListEvents({ registration_open: "1" });
 *
 * // Get events for a specific kindergarten
 * const { events, isLoading } = useListEvents({ kindergarten: "KG_Kidzone" });
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (events) {
 *   return events.map(event => <div key={event.name}>{event.title}</div>);
 * }
 * ```
 */
export const useListEvents = (
  params?: ListEventsParams,
  enabled: boolean = true
) => {
  const { data, error, isValidating, mutate } = useFrappeGetCall<{
    message: EventListResponse;
  }>(
    "ws_event_page.api.kindergarten_demo_day.visit_event.get_list_of_events",
    enabled ? params : undefined,
    enabled
      ? `events_list_${params?.kindergarten || "all"}_${params?.registration_open || "all"}`
      : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  return {
    /** The full API response */
    data,
    /** The events list (shorthand for data?.message?.data) */
    events: data?.message?.data,
    /** Whether the request was successful */
    isSuccess: data?.message?.success,
    /** API response message */
    message: data?.message?.message,
    /** Error object if request failed */
    error,
    /** Whether data is currently being fetched */
    isLoading: isValidating && !data && !error,
    /** Whether data is being revalidated */
    isValidating,
    /** Function to manually revalidate/refetch data */
    mutate,
  };
};
