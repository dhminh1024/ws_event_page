import { useFrappePostCall } from "frappe-react-sdk";
import { FRAPPE_APIS } from "./api.config";
import { WSEACLead } from "../../../types/WellspringEventPage/WSEACLead";

const useRegisterTestSlot = () => {
  const { call } = useFrappePostCall<{ message: WSEACLead }>(
    FRAPPE_APIS.REGISTER_FOR_TEST.METHOD_STRING
  );

  return { register: call };
};

export default useRegisterTestSlot;
