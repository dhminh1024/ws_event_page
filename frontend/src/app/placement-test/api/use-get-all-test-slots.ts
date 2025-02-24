import { useFrappeGetCall } from "frappe-react-sdk";
import { FRAPPE_APIS } from "./api.config";
import { WSEACTestSlot } from "../../../types/WellspringEventPage/WSEACTestSlot";
import { useErrorHandler } from "./use-error-handler";

const useGetAllTestSlots = (bookingID?: string, skip?: boolean) => {
  const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<{
    message: WSEACTestSlot[];
  }>(
    FRAPPE_APIS.GET_ALL_TEST_SLOTS.METHOD_STRING,
    {
      booking_id: bookingID,
    },
    !skip ? `FRAPPE_APIS.GET_ALL_TEST_SLOTS.SWR_KEY_${bookingID}` : null,
    {} // options
  );
  const { getMessage } = useErrorHandler();

  const errors = error ? getMessage(error) : [];
  const errorCode =
    errors.length > 0 ? errors[errors.length - 1]?.message : undefined;

  return {
    testSlots: data?.message,
    isLoading,
    isValidating,
    error: errorCode,
    mutate
  };
};

export default useGetAllTestSlots;
