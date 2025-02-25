import { cn } from "@/core/utils/shadcn-utils";
import { Button, ButtonProps } from "@atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@atoms/dialog";
import { Input } from "@atoms/input";
import { DialogTrigger } from "@radix-ui/react-dialog";
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    title?: string;
    subtitle?: string;
    variant?: "default" | "typing";
    inputSetting?: {
      inputLabel: ReactNode;
      textConfirm: string;
    };
    previewContent?: ReactNode;
    cancelButtonProps?: ButtonProps;
    cancelButtonText?: string;
    hasCancelButton?: boolean;
    confirmButtonProps?: ButtonProps;
    confirmButtonText?: string;
    onConfirm?: () => void;
    onClose?: () => void;
  };

export default function ConfirmModal({
  open,
  className,
  children,
  title = "Title",
  subtitle,
  inputSetting,
  previewContent,
  confirmButtonProps,
  confirmButtonText = "Confirm",
  cancelButtonProps,
  cancelButtonText = "Cancel",
  hasCancelButton = true,
  onConfirm,
  onClose,
  variant = "default",
}: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [textValue, setTextValue] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  function onChangeTextValue(value: string) {
    startTransition(() => {
      setTextValue(value);
    });
  }

  const handleChangeOpen = (isOpen: boolean) => {
    setOpenDialog(isOpen);
    setTextValue("");
    if (!isOpen) {
      onClose?.();
    }
  };

  const handleClickConfirm = async () => {
    onConfirm?.();
    handleChangeOpen(false);
  };

  useEffect(() => {
    if (open !== undefined && openDialog !== open) {
      setOpenDialog(open);
    }
  }, [open, openDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={handleChangeOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("max-w-[400px] bg-white", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        {variant === "typing" && (
          <div className="flex flex-col gap-1">
            <label htmlFor="text-confirm text-white" className="text-xs">
              {inputSetting?.inputLabel}
            </label>
            <Input
              id="text-confirm"
              value={textValue}
              onChange={(e) => onChangeTextValue(e.target.value)}
            />
          </div>
        )}
        {previewContent}
        <DialogFooter className="flex justify-end">
          {hasCancelButton && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpenDialog(false)}
              {...cancelButtonProps}
            >
              {cancelButtonText}
            </Button>
          )}

          <Button
            type="button"
            onClick={handleClickConfirm}
            {...confirmButtonProps}
            disabled={
              variant === "typing" &&
              textValue.trim() !== inputSetting?.textConfirm
            }
          >
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
