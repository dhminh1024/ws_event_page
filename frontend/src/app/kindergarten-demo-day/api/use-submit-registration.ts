import { useFrappePostCall } from "frappe-react-sdk";
import type { SubmitRegistrationResponse } from "../types/kdd.types";

/**
 * Parameters for submitting a certificate registration
 */
export interface SubmitRegistrationParams {
  visit_event: string;
  student_full_name: string;
  student_dob: string;
  parent_full_name: string;
  parent_email: string;
  parent_phone_number: string;
  rating: number;
}

/**
 * Custom hook to submit a certificate registration for kindergarten demo day
 *
 * This hook handles parent registration for an existing student's event certificate.
 * The student must already be registered before parents can submit.
 * Multiple parents can register for the same student.
 *
 * Rate Limited: 10 requests per hour per IP address
 *
 * @returns Object containing the call function and loading state
 *
 * @example
 * ```tsx
 * const { call, loading, error, reset } = useSubmitRegistration();
 *
 * const handleSubmit = async () => {
 *   const result = await call({
 *     visit_event: "KDD_EVENT_123",
 *     student_full_name: "John Doe",
 *     student_dob: "2020-01-15",
 *     parent_full_name: "Jane Doe",
 *     parent_email: "jane@example.com",
 *     parent_phone_number: "0123456789",
 *     rating: 5
 *   });
 *
 *   if (result?.success) {
 *     console.log("Certificate URL:", result.data.certificate_url);
 *   }
 * };
 * ```
 */
export const useSubmitRegistration = () => {
  const { call, loading, error, reset } = useFrappePostCall<{
    message: SubmitRegistrationResponse;
  }>("ws_event_page.api.kindergarten_demo_day.registration.submit_registration");

  /**
   * Submit a certificate registration
   *
   * @param params - Registration parameters
   * @returns Promise resolving to the API response
   */
  const submitRegistration = async (params: SubmitRegistrationParams) => {
    const result = await call(params);
    return result?.message;
  };

  return {
    /** Function to submit registration */
    submitRegistration,
    /** Whether the request is in progress */
    loading,
    /** Error object if request failed */
    error,
    /** Function to reset the hook state */
    reset,
  };
};
