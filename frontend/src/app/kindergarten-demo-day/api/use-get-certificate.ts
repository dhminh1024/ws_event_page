import { useFrappeGetCall } from "frappe-react-sdk";
import type { GetCertificateResponse } from "../types/kdd.types";

/**
 * Custom hook to fetch certificate data by token for kindergarten demo day
 *
 * This hook retrieves certificate information using a secure token.
 * The token is generated during registration and provides access to
 * the student's certificate without authentication.
 *
 * @param certificateToken - The unique certificate token (URL-safe base64 string)
 * @param skip - Whether to skip fetching (default: false)
 * @returns SWR response with certificate data, error, loading states, and mutate function
 *
 * @example
 * ```tsx
 * const { data, error, isLoading, mutate } = useGetCertificate("Ap0dnmsSGdqH2LtruzGyCQ");
 *
 * if (isLoading) return <div>Loading certificate...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * if (data?.success) {
 *   const certificate = data.data;
 *   return (
 *     <div>
 *       <h1>{certificate.student_name}</h1>
 *       <p>{certificate.event_title}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export const useGetCertificate = (certificateToken?: string, skip: boolean = false) => {
  const shouldFetch = !skip && !!certificateToken;

  const { data, error, isValidating, mutate } = useFrappeGetCall<{
    message: GetCertificateResponse;
  }>(
    "ws_event_page.api.kindergarten_demo_day.certificate.get_certificate",
    shouldFetch
      ? {
          certificate_token: certificateToken,
        }
      : undefined,
    shouldFetch ? `certificate_${certificateToken}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );


  return {
    /** The certificate data wrapped in API response */
    data,
    /** The certificate object (shorthand for data?.message?.data) */
    certificate: data?.message?.data,
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
