import {
  useFrappeFileUpload,
  useFrappeGetCall,
  useFrappePostCall,
} from "frappe-react-sdk";
import { FRAPPE_APIS } from "./api.config";
import { WSEGSRegistration } from "@/types/WellspringEventPage/WSEGSRegistration";

export type Payload = {
  full_name: string;
  email: string;
  entry_group: string;
  entry_name: string;
  entry_category: string;
  entry_participants: string;
  mobile_number: string;
  entry_file?: File;
  instrument_info?: string | undefined;
  talent_info?: string | undefined;
};

const useRegistration = () => {
  const { call } = useFrappePostCall<{ message: WSEGSRegistration }>(
    FRAPPE_APIS.CREATE_REGISTRATION.METHOD_STRING
  );

  const { upload } = useFrappeFileUpload();

  const submit = async (data: Payload) => {
    const { entry_file, ...rest } = data;
    const response = await call(rest);
    const registration_id = response.message.registration_id;
    if (entry_file) {
      const uploadResponse = await upload(
        entry_file,
        {
          isPrivate: true,
          otherData: {
            registration_id,
          },
        },
        FRAPPE_APIS.UPLOAD_REGISTRATION_FILE.METHOD_STRING
      );
    }

    return;
  };

  return { submit };
};

export default useRegistration;
