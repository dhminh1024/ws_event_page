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
import env from "@/config/env";
import { useLocales } from "@/core/hooks/use-locales";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { X } from "lucide-react";
import { Button } from "@atoms/button";
import { CheckCircle, XCircle } from "phosphor-react";

export type ModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    title?: string;
    description?: ReactNode;
    type?: "success" | "error";
    onConfirm?: (letter: string) => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const NotificationModal: FC<ModalProps> = ({
  open: $open = false,
  title,
  description,
  className,
  children,
  type = "success",
  onConfirm,
  onCancel,
  onClosed,
}) => {
  const { t } = useLocales();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const event = useEventPageContext();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onClosed?.();
    }
  };

  useEffect(() => {
    setIsOpen($open);
  }, [$open]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          " max-w-[480px] w-full bg-white border-none shadow-none px-[10px]",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="">
          {type === "success"  && <CheckCircle className="text-brand-teal mx-auto" size={100} weight="regular"/>}
          {type === "error" && <XCircle className="text-pt-ember mx-auto" size={100} weight="regular"/>}
          <p
            className={cn(
              "text-[24px] md:text-[34px] mb-[10px] text-center font-bold",
              {
                "text-brand-teal": type === "success",
                "text-pt-ember": type === "error",
              }
            )}
          >
            {title}
          </p>
          <p className="text-[14px] md:text-[18px] text-center text-pt-primary">
            {description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
