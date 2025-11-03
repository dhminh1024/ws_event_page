import {
  useFrappeFileUpload,
  useFrappeGetCall,
  useFrappePostCall,
} from "frappe-react-sdk";
import { FRAPPE_APIS } from "./api.config";
import { WSEGSRegistration } from "@/types/WellspringEventPage/WSEGSRegistration";
import { useState } from "react";
import { useApiErrorHandler } from "@/core/hooks/use-api-error-handler";
import { toast } from "sonner";

export type Payload = {
  full_name: string;
  email: string;
  entry_group: string;
  entry_name: string;
  entry_category: string;
  entry_participants: string[];
  mobile_number: string;
  entry_file?: File;
  instrumental_info?: string | undefined;
  talent_info?: string | undefined;
};

const useRegistration = () => {
  const { call } = useFrappePostCall<{ message: WSEGSRegistration }>(
    FRAPPE_APIS.CREATE_REGISTRATION.METHOD_STRING
  );

  const { upload } = useFrappeFileUpload();
  const [loading, setLoading] = useState(false);
  const { handleError } = useApiErrorHandler();

  const submit = async (data: Payload) => {
    try {
      setLoading(true);
      const { entry_file, entry_participants, ...rest } = data;
      // Convert participants array to newline-separated string for backend
      const formattedData = {
        ...rest,
        entry_participants: entry_participants
          .filter((p) => p.trim())
          .join("\n"),
      };
      try {
        const response = await call(formattedData);
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
          alert(JSON.stringify(uploadResponse));
        }
      } catch (uploadError) {
        toast.error("Failed", {
          description: `${JSON.stringify(uploadError)}`,
        });
        return;
      }
      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      handleError(error);
      throw error; // Re-throw so the form can handle it
    }
  };

  return { submit, loading };
};

export default useRegistration;
