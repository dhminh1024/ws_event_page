import { toast } from "sonner";
import { useCallback } from "react";

interface FrappeError {
  message?: string;
  exception?: string;
  exc_type?: string;
  _server_messages?: string;
}

export const useApiErrorHandler = () => {
  const handleError = useCallback((error: any) => {
    console.error("API Error:", error);

    let errorMessage = "An unexpected error occurred";
    let errorTitle = "Error";

    // Handle Frappe API errors
    if (error?.exception || error?.exc_type) {
      const frappeError = error as FrappeError;

      // Try to parse _server_messages if available
      if (frappeError._server_messages) {
        try {
          const messages = JSON.parse(frappeError._server_messages);
          const parsedMessages = Array.isArray(messages)
            ? messages.map((msg) => JSON.parse(msg))
            : [JSON.parse(messages)];

          if (parsedMessages.length > 0 && parsedMessages[0].message) {
            errorMessage = parsedMessages[0].message;
          }
        } catch (e) {
          console.error("Failed to parse server messages", e);
        }
      }

      // Fallback to exception message
      if (errorMessage === "An unexpected error occurred" && frappeError.exception) {
        errorMessage = frappeError.exception;
      }
    }

    // Handle standard error messages
    if (error?.message && errorMessage === "An unexpected error occurred") {
      errorMessage = error.message;
    }

    // Handle HTTP errors
    if (error?.httpStatus) {
      errorTitle = `Error ${error.httpStatus}`;
      if (error.httpStatus === 401) {
        errorMessage = "Unauthorized. Please log in.";
      } else if (error.httpStatus === 403) {
        errorMessage = "You don't have permission to perform this action.";
      } else if (error.httpStatus === 404) {
        errorMessage = "The requested resource was not found.";
      } else if (error.httpStatus === 500) {
        errorMessage = "Server error. Please try again later.";
      }
    }

    // Display Sonner toast notification
    toast.error(errorTitle, {
      description: errorMessage,
    });

    return errorMessage;
  }, []);

  return { handleError };
};
