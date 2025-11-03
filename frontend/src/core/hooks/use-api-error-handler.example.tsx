/**
 * HOW TO USE API ERROR HANDLER WITH TOAST NOTIFICATIONS
 *
 * This file shows examples of how to display API errors using toast notifications
 */

import { useApiErrorHandler } from "./use-api-error-handler";
import { toast } from "@atoms/use-toast";
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
      toast({
        title: "Success",
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
      toast({
        title: "Success",
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

      toast({
        title: "Form Submitted",
        description: "Your form has been submitted for review.",
      });
    } catch (error) {
      // Use handleError for default error handling
      handleError(error);

      // Or show custom error message
      toast({
        variant: "destructive",
        title: "Submission Failed",
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
    toast({
      title: "Information",
      description: "This is an informational message.",
    });
  };

  const showWarningToast = () => {
    toast({
      title: "Warning",
      description: "Please save your changes before leaving.",
    });
  };

  const showSuccessToast = () => {
    toast({
      title: "Success",
      description: "Your changes have been saved.",
    });
  };

  const showErrorToast = () => {
    toast({
      variant: "destructive",
      title: "Error",
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

      toast({
        title: "Registration Successful",
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

      toast({
        title: "Item Deleted",
        description: "The item has been removed.",
        action: {
          label: "Undo",
          onClick: () => {
            // Handle undo logic
            console.log("Undo delete");
          },
        } as any,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
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
    const loadingToast = toast({
      title: "Processing...",
      description: "Please wait while we process your data.",
    });

    try {
      const response = await call(data);

      // Dismiss loading toast
      loadingToast.dismiss();

      // Show success toast
      toast({
        title: "Processing Complete",
        description: "Your data has been processed successfully.",
      });
    } catch (error) {
      // Dismiss loading toast
      loadingToast.dismiss();

      // Show error toast
      handleError(error);
    }
  };

  return null;
}

// ============================================
// QUICK REFERENCE
// ============================================

/*

// Import required hooks
import { toast } from "@atoms/use-toast";
import { useApiErrorHandler } from "@/core/hooks/use-api-error-handler";

// Initialize error handler
const { handleError } = useApiErrorHandler();

// Show success toast
toast({
  title: "Success",
  description: "Operation completed successfully",
});

// Show error toast (manual)
toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong",
});

// Handle API error (automatic)
try {
  await apiCall();
} catch (error) {
  handleError(error); // Automatically shows error toast
}

*/
