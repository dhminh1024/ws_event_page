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
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { X } from "lucide-react";
import { SecondaryButton } from "./button";
import SuccessFooterImage from "@greatest-show-25/assets/images/success-footer.webp";
import parser from "html-react-parser";
import { Button } from "@atoms/button";
export type LunarModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    title?: string;
    description?: string;
    onConfirm?: (letter: string) => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const NotificationModal: FC<LunarModalProps> = ({
  open: $open = false,
  title,
  description,
  className,
  children,
  onConfirm,
  onCancel,
  onClosed,
}) => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(true);
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

  if (title === undefined && description === undefined) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          " max-w-1920 w-full bg-hr-background border-none shadow-none ",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <Button
          className="absolute -top-200 right-40 md:-right-120 w-120 bg-transparent! h-120 z-20 rounded-full"
          size={"icon"}
          variant={"outline"}
          onClick={() => handleOpenChange(false)}
        >
          <X className="w-[20rem]! h-80! text-white" />
        </Button>
        <div className="px-[2%] py-80">
          <center className="mb-20 px-[7%]">
            <div className="py-80 md:py-60 text-[20rem] md:text-[26rem] text-gs-primary font-bold">
              {title}
            </div>
            <div className="py-80 md:py-60 text-[20rem] md:text-[24rem] text-gs-primary font-medium">
              {description}
            </div>
          </center>
        </div>
        <img className="w-full" src={SuccessFooterImage} alt="Footer" />
      </DialogContent>
    </Dialog>
  );
};
