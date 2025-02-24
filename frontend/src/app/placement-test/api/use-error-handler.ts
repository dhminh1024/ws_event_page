import { useToast } from "@atoms/use-toast";
import { FrappeError } from "frappe-react-sdk";
import { useLocales } from "@/core/hooks/use-locales";

interface FrappeServerMessage {
  message: string;
  title?: string;
  indicator?: string;
}

export const useErrorHandler = () => {
  const { t } = useLocales();
  const { toast } = useToast();

  const handleError = (error?: FrappeError) => {
    if (!error) return [];
    const eMessages = getMessage(error);
    toast({
      variant: "destructive",
      title: t("components.notification.handle_error.heading"),
      description: eMessages.map((m) => m.message),
    });
    return eMessages;
  };

  const getMessage = (error?: FrappeError) => {
    let eMessages: FrappeServerMessage[] = error?._server_messages
      ? JSON.parse(error?._server_messages)
      : [];
    eMessages = eMessages.map((m: any) => {
      try {
        return JSON.parse(m);
      } catch (e) {
        return m;
      }
    });

    if (eMessages.length === 0) {
      // Get the message from the exception by removing the exc_type
      const indexOfFirstColon = error?.exception?.indexOf(":");
      if (indexOfFirstColon) {
        const exception = error?.exception?.slice(indexOfFirstColon + 1);
        if (exception) {
          eMessages = [
            {
              message: exception,
              title: "Error",
            },
          ];
        }
      }

      if (eMessages.length === 0) {
        eMessages = [
          {
            message:
              error?.message || t("components.notification.client_error"),
            title: "Error",
            indicator: "red",
          },
        ];
      }
    }
    return eMessages;
  };

  return { handleError, getMessage };
};
