import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@atoms/dialog";
import Typography from "./typography";
import { useLocales } from "@/core/hooks/use-locales";
import { useResponsive } from "@/core/hooks/use-reponsive";
import parser from "html-react-parser";
import { Button } from "@atoms/button";
import { saveAs } from "file-saver";
import { useHRSettings } from "../context/use-settings";

export type ItemModalProps = Omit<HTMLAttributes<HTMLDivElement>, "content"> &
  PropsWithChildren & {
    open?: boolean;
    content?: (callback?: VoidFunction) => ReactNode;
    disabled?: boolean;
    onConfirm?: VoidFunction;
    onCancel?: VoidFunction;
    onClosed?: VoidFunction;
  };

export const ItemModal: FC<ItemModalProps> = ({
  open: $open = false,
  className,
  children,
  content,
  disabled,
  onConfirm,
  onCancel,
  onClosed,
}) => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useHRSettings();

  const handleOpenChange = (open: boolean) => {
    if (disabled) return;
    setIsOpen(open);
    if (!open) {
      onClosed?.();
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm?.();
  };

  useEffect(() => {
    setIsOpen($open);
  }, [$open]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className="cursor-pointer" asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-3072 w-full bg-hr-background border-none shadow-none p-0",
          className
        )}
      >
        <DialogTitle hidden></DialogTitle>
        <DialogDescription hidden></DialogDescription>
        {content?.(() => handleOpenChange(false))}
      </DialogContent>
    </Dialog>
  );
};
