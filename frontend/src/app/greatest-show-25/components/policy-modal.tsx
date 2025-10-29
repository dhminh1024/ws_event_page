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
import { useEventPageContext } from "@/lib/event-page/use-event-page";

export type LunarModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    disabled?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const PolicyModal: FC<LunarModalProps> = ({
  open: $open = false,
  className,
  children,
  disabled,
  onConfirm,
  onCancel,
  onClosed,
}) => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const event = useEventPageContext();

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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-4096 w-full bg-hr-background shadow-none p-0",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="h-400 bg-gray-400"></div>
        <center className="mb-20 px-80 h-[80vh] overflow-x-hidden">
          <Typography.Heading
            className="py-80 text-[25rem] text-hr-blue leading-[1.2] font-extrabold"
            level={2}
          >
            {parser(t("happy_run.form.policy_heading"))}
          </Typography.Heading>

          <Typography.Paragraph className="mb-40 text-[16rem] text-hr-blue ">
            {event.variables?.policy_note?.value}
          </Typography.Paragraph>
          <div className="bg-white border-hr-blue border-[1rem] p-80 rounded-[5rem] mb-80 ">
            <div className="h-2000 bg-red-200"></div>
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            // disabled={isRequesting}
            className={cn(
              "text-[20rem] px-80 py-40 rounded-[5rem] mb-40 flex items-center bg-hr-ember text-white"
            )}
          >
            {t("happy_run.buttons.finish")}
          </button>
        </center>
      </DialogContent>
    </Dialog>
  );
};
