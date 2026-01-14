import { useFrappePostCall } from "frappe-react-sdk";
import { FRAPPE_APIS } from "./api.config";
import { WSEACLead } from "../../../types/WellspringEventPage/WSEACLead";

const useRegisterForEvent = () => {
  const { call, loading } = useFrappePostCall<{ message: WSEACLead }>(
    FRAPPE_APIS.REGISTER_FOR_EVENT.METHOD_STRING
  );

  return { register: call, loading };
};

export default useRegisterForEvent;
