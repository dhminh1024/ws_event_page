/**
 * HOW TO USE API ERROR HANDLER WITH SONNER TOAST NOTIFICATIONS
 *
 * This file shows examples of how to display API errors using Sonner toast notifications
 */

import { useApiErrorHandler } from "./use-api-error-handler";
import { toast } from "sonner";
import { useFrappePostCall, useFrappeGetCall } from "frappe-react-sdk";

// ============================================
// EXAMPLE 1: Basic API Call with Error Handling
// ============================================

export function ExampleBasicApiCall() {
  const { call } = useFrappePostCall("your.api.method");
  const { handleError } = useApiErrorHandler();

  const handleSubmit = async (data: any) => {
    try {
      const response = await call(data);

      // Success toast
      toast.success("Success", {
        description: "Operation completed successfully!",
      });

      return response;
    } catch (error) {
      // Error toast will be displayed automatically
      handleError(error);
    }
  };

  return null;
}

// ============================================
// EXAMPLE 2: Multiple API Calls in Sequence
// ============================================

export function ExampleSequentialApiCalls() {
  const { call: createItem } = useFrappePostCall("app.create_item");
  const { call: uploadFile } = useFrappePostCall("app.upload_file");
  const { handleError } = useApiErrorHandler();

  const handleSubmit = async (itemData: any, file: File) => {
    try {
      // First API call
      const itemResponse = await createItem(itemData);

      // Second API call
      await uploadFile({
        item_id: itemResponse.message.id,
        file
      });

      // Success toast
      toast.success("Success", {
        description: "Item created and file uploaded successfully!",
      });
    } catch (error) {
      // Error at any step will display error toast
      handleError(error);
    }
  };

  return null;
}

// ============================================
// EXAMPLE 3: Custom Error Messages
// ============================================

export function ExampleCustomErrorMessages() {
  const { call } = useFrappePostCall("app.submit_form");
  const { handleError } = useApiErrorHandler();

  const handleSubmit = async (data: any) => {
    try {
      await call(data);

      toast.success("Form Submitted", {
        description: "Your form has been submitted for review.",
      });
    } catch (error) {
      // Use handleError for default error handling
      handleError(error);

      // Or show custom error message
      toast.error("Submission Failed", {
        description: "Please check your form and try again.",
      });
    }
  };

  return null;
}

// ============================================
// EXAMPLE 4: Info and Warning Toasts
// ============================================

export function ExampleInfoAndWarningToasts() {
  const showInfoToast = () => {
    toast.info("Information", {
      description: "This is an informational message.",
    });
  };

  const showWarningToast = () => {
    toast.warning("Warning", {
      description: "Please save your changes before leaving.",
    });
  };

  const showSuccessToast = () => {
    toast.success("Success", {
      description: "Your changes have been saved.",
    });
  };

  const showErrorToast = () => {
    toast.error("Error", {
      description: "Something went wrong. Please try again.",
    });
  };

  return null;
}

// ============================================
// EXAMPLE 5: Using with React Hook Form
// ============================================

export function ExampleWithReactHookForm() {
  const { call } = useFrappePostCall("app.register_user");
  const { handleError } = useApiErrorHandler();

  const onSubmit = async (formData: any) => {
    try {
      const response = await call(formData);

      toast.success("Registration Successful", {
        description: `Welcome, ${response.message.name}!`,
      });

      // Navigate or reset form
    } catch (error: any) {
      handleError(error);

      // Optionally set form errors
      // form.setError("root", {
      //   type: "manual",
      //   message: "Registration failed"
      // });
    }
  };

  return null;
}

// ============================================
// EXAMPLE 6: Toast with Action Button
// ============================================

export function ExampleToastWithAction() {
  const { call } = useFrappePostCall("app.delete_item");

  const handleDelete = async (itemId: string) => {
    try {
      await call({ item_id: itemId });

      toast.success("Item Deleted", {
        description: "The item has been removed.",
        action: {
          label: "Undo",
          onClick: () => {
            // Handle undo logic
            console.log("Undo delete");
          },
        },
      });
    } catch (error) {
      toast.error("Delete Failed", {
        description: "Could not delete the item.",
      });
    }
  };

  return null;
}

// ============================================
// EXAMPLE 7: Loading States with Toast
// ============================================

export function ExampleLoadingWithToast() {
  const { call } = useFrappePostCall("app.process_data");
  const { handleError } = useApiErrorHandler();

  const handleProcess = async (data: any) => {
    // Show loading toast
    const loadingToastId = toast.loading("Processing...", {
      description: "Please wait while we process your data.",
    });

    try {
      const response = await call(data);

      // Dismiss loading toast and show success
      toast.success("Processing Complete", {
        description: "Your data has been processed successfully.",
        id: loadingToastId, // Replace the loading toast
      });
    } catch (error) {
      // Dismiss loading toast and show error
      toast.error("Processing Failed", {
        description: "An error occurred while processing your data.",
        id: loadingToastId, // Replace the loading toast
      });

      handleError(error);
    }
  };

  return null;
}

// ============================================
// QUICK REFERENCE - SONNER TOAST
// ============================================

/*

// Import required hooks
import { toast } from "sonner";
import { useApiErrorHandler } from "@/core/hooks/use-api-error-handler";

// Initialize error handler
const { handleError } = useApiErrorHandler();

// Show success toast
toast.success("Success", {
  description: "Operation completed successfully",
});

// Show error toast (manual)
toast.error("Error", {
  description: "Something went wrong",
});

// Show info toast
toast.info("Info", {
  description: "This is an informational message",
});

// Show warning toast
toast.warning("Warning", {
  description: "Please be careful",
});

// Show loading toast
const loadingId = toast.loading("Loading...", {
  description: "Please wait",
});

// Update/replace loading toast
toast.success("Complete!", {
  description: "Operation finished",
  id: loadingId, // Replace the loading toast
});

// Toast with action button
toast.success("Deleted", {
  description: "Item removed successfully",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
});

// Handle API error (automatic)
try {
  await apiCall();
} catch (error) {
  handleError(error); // Automatically shows error toast
}

*/
