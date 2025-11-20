import { useFrappePostCall } from "frappe-react-sdk";
import { useEffect, useRef } from "react";

interface TrackPageVisitParams {
  event_name: string;
  referrer?: string;
  user_agent?: string;
}

interface TrackPageVisitResponse {
  success: boolean;
  message: string;
}

/**
 * Hook to track page visits for an event
 * Automatically tracks once when the component mounts
 */
export const useTrackPageVisit = (eventName: string | undefined) => {
  const hasTracked = useRef(false);

  const { call: trackVisit, loading, error } = useFrappePostCall<
    TrackPageVisitResponse
  >("ws_event_page.api.kindergarten_demo_day.tracking.track_page_visit");

  useEffect(() => {
    // Only track once per page load
    if (eventName && !hasTracked.current) {
      hasTracked.current = true;

      // Get referrer and user agent
      const referrer = document.referrer || undefined;
      const userAgent = navigator.userAgent || undefined;

      // Track the visit
      trackVisit({
        event_name: eventName,
        referrer,
        user_agent: userAgent,
      }).catch((err) => {
        // Log error but don't block the page
        console.error("Failed to track page visit:", err);
      });
    }
  }, [eventName, trackVisit]);

  return {
    loading,
    error,
  };
};

/**
 * Hook to get event statistics
 */
export const useEventStatistics = (eventName: string | undefined) => {
  const { call: getStatistics, data, loading, error } = useFrappePostCall<{
    success: boolean;
    data: {
      event_name: string;
      event_title: string;
      page_visits: number;
      total_registrations: number;
      certificates_generated: number;
      total_parent_submissions: number;
      average_rating: number;
      registration_open: boolean;
    };
    message: string;
  }>("ws_event_page.api.kindergarten_demo_day.tracking.get_event_statistics");

  const fetchStatistics = () => {
    if (eventName) {
      getStatistics({ event_name: eventName });
    }
  };

  return {
    statistics: data?.data,
    loading,
    error,
    fetchStatistics,
  };
};
