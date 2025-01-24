import { Button } from "@atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@atoms/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { HTMLAttributes, PropsWithChildren, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { useToast } from "@atoms/use-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ANY } from "@/lib/utils/types";
import { useSignInForm } from "../hooks/use-sign-in-form";
import SignInForm from "./sign-in-form";

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    onSubmitForm?: () => void;
  };
export default function SignInModal({
  className,
  children,
  onSubmitForm,
}: Props) {
  const [open, setOpen] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const { form, error, handleSubmit, reset } = useSignInForm();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleClose();
    } else {
      setOpen(isOpen);
      reset();
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    navigate("..", { replace: true }); // Navigate back to the previous route to close the modal
  };

  const handleClickSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const handleSubmitForm = (data: ANY, photos: File[]) =>
    handleSubmit(data)
      .then((id) => {
        handleOpenChange(false);
        // window.location.reload()
        // onSubmitForm?.(id);
        reset();
      })
      .catch((e) => true);

  // useEffect(() => {
  //   if (error) {
  //     toast({
  //       title: error.message || 'Error',
  //       description: typeof error === 'string' ? error : error.exception,
  //       variant: 'destructive',
  //     })
  //   }
  // }, [JSON.stringify(error)])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} onClose={handleClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[50%] flex h-[70vh] w-[700px] max-w-[100vw] translate-y-[-50%] flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Login</DialogTitle>
          <DialogDescription>Welcome to the Happy Journey</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-x-hidden px-2">
          {open && <SignInForm ref={formRef} />}
        </div>
        <DialogFooter className="flex justify-end">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleClickSubmit}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
