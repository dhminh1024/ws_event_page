import { useFrappeGetCall } from "frappe-react-sdk";
import type { EventVisitResponse } from "../types/kdd.types";

/**
 * Custom hook to fetch kindergarten demo day visit event details
 *
 * @param eventName - The name/ID of the visit event (e.g., "KDD_EVENT_202511329_Kidzone_Visit_")
 * @param enabled - Whether to enable the query (default: true when eventName is provided)
 * @returns SWR response with event data, error, loading states, and mutate function
 *
 * @example
 * ```tsx
 * const { data, error, isLoading, mutate } = useEventVisit("KDD_EVENT_202511329_Kidzone_Visit_");
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * if (data?.success) {
 *   const event = data.data;
 *   return <div>{event.title}</div>;
 * }
 * ```
 */
export const useEventVisit = (eventName?: string, skip: boolean = false) => {
  const shouldFetch = !skip && !!eventName;

  const { data, error, isValidating, mutate } = useFrappeGetCall<{
    message: EventVisitResponse;
  }>(
    "ws_event_page.api.kindergarten_demo_day.visit_event.get_event_details",
    shouldFetch
      ? {
          event_name: eventName,
        }
      : undefined,
    shouldFetch ? `event_visit_${eventName}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  return {
    /** The event visit data wrapped in API response */
    data,
    /** The event visit object (shorthand for data?.data) */
    eventVisit: data?.message?.data,
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
