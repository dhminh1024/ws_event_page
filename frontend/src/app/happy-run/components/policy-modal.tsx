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
          "max-w-[1024rem] w-full bg-hr-background shadow-none p-0",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="h-[100rem] bg-gray-400"></div>
        <center className="mb-[5rem] px-[20rem] h-[80vh] overflow-x-hidden">
          <Typography.Heading
            className="py-[20rem] text-[25rem] text-hr-blue leading-[1.2] font-extrabold"
            level={2}
          >
            {parser(t("happy_run.form.policy_heading"))}
          </Typography.Heading>

          <Typography.Paragraph className="mb-[10rem] text-[16rem] text-hr-blue ">
            {event.variables?.policy_note?.value}
          </Typography.Paragraph>
          <div className="bg-white border-hr-blue border-[1rem] p-[20rem] rounded-[5rem] mb-[20rem] ">
            <div className="h-[500rem] bg-red-200"></div>
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            // disabled={isRequesting}
            className={cn(
              "text-[20rem] px-[20rem] py-[10rem] rounded-[5rem] mb-[10rem] flex items-center bg-hr-ember text-white"
            )}
          >
            {t("happy_run.buttons.finish")}
          </button>
        </center>
      </DialogContent>
    </Dialog>
  );
};
