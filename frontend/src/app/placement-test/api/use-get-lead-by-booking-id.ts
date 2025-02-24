import { useFrappeGetCall } from "frappe-react-sdk";
import { FRAPPE_APIS } from "./api.config";
import { WSEACLead } from "../../../types/WellspringEventPage/WSEACLead";
import { useErrorHandler } from "./use-error-handler";

const useGetLeadByBookingID = (bookingID?: string, skip?: boolean) => {
  const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<{
    message: WSEACLead;
  }>(
    FRAPPE_APIS.GET_LEAD_BY_BOOKING_ID.METHOD_STRING,
    {
      booking_id: bookingID,
    },
    !skip ? `FRAPPE_APIS.GET_LEAD_BY_BOOKING_ID.SWR_KEY_${bookingID}` : null,
    {
      revalidateOnFocus: true,
    } // options
  );
  const { getMessage } = useErrorHandler();

  const errors = error ? getMessage(error) : [];
  const errorCode =
    errors.length > 0 ? errors[errors.length - 1]?.message : undefined;

  return {
    lead: data?.message,
    isLoading,
    isValidating,
    error: errorCode,
    mutate
  };
};

export default useGetLeadByBookingID;
