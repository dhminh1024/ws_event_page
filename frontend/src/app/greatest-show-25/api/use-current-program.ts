import { useFrappeGetCall } from "frappe-react-sdk";
import { FRAPPE_APIS } from "./api.config";
import { WSEGSProgram } from "@/types/WellspringEventPage/WSEGSProgram";

/**
 * Custom hook to get the current Greatest Show program.
 *
 * @param skip - Optional flag to skip the API call (default: false)
 * @returns Object containing:
 *   - currentProgram: The current program data with calculated is_opened and is_expired flags
 *   - isLoading: Loading state
 *   - isValidating: Revalidating state
 *   - error: Error object if request fails
 *   - mutate: Function to manually revalidate the data
 *
 * @example
 * ```tsx
 * const { currentProgram, isLoading, error } = useCurrentProgram();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error loading program</div>;
 * if (!currentProgram) return <div>No current program</div>;
 *
 * return (
 *   <div>
 *     <h1>{currentProgram.title_en}</h1>
 *     <p>Program Code: {currentProgram.program_code}</p>
 *     <p>Is Open: {currentProgram.is_opened ? 'Yes' : 'No'}</p>
 *     <p>Is Expired: {currentProgram.is_expired ? 'Yes' : 'No'}</p>
 *   </div>
 * );
 * ```
 */
const useCurrentProgram = (skip?: boolean) => {
  const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<
    {
      message: WSEGSProgram
    }
  >(
    FRAPPE_APIS.GET_CURRENT_PROGRAM.METHOD_STRING,
    undefined,
    !skip ? FRAPPE_APIS.GET_CURRENT_PROGRAM.SWR_KEY : null,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    currentProgram: data?.message,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};

export default useCurrentProgram;
