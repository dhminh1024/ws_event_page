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
import TopPageImage from "@happy-run/assets/images/top-page-2.webp";
import { Link } from "react-router-dom";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";

export type OrderItemDetail = {
  name: string;
  ticket_class: string;
  distance: string;
  size: string;
  bib?: string;
  price: number;
};

export type LunarModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    codeUrl?: string;
    orderName?: string;
    disabled?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const PaymentFailedModal: FC<LunarModalProps> = ({
  open: $open = false,
  className,
  children,
  codeUrl,
  orderName,
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-3800 w-[95%] md:w-full bg-hr-background border-none shadow-none p-0",
          className
        )}
      >
        <DialogTitle hidden></DialogTitle>
        <DialogDescription hidden></DialogDescription>
        <img className="w-full" src={TopPageImage} alt="Top Page" />
        <center className="mb-20 p-40 md:p-[20rem_40rem]">
          <Typography.Heading
            className="py-80 md:py-60 text-[18rem] md:text-[28rem] text-hr-blue leading-[1.2] font-extrabold"
            level={2}
          >
            {parser(t("happy_run.form.payment_failed_heading"))}
          </Typography.Heading>
          <div className="px-0">
            <Typography.Paragraph className="pb-20  text-[13rem] md:text-[18rem] text-hr-blue leading-[1.2]">
              {t("happy_run.form.payment_failed_desc_1")}
            </Typography.Paragraph>
            <Typography.Paragraph className="pb-20  text-[13rem] md:text-[18rem] text-hr-blue leading-[1.2]">
              {t("happy_run.form.payment_failed_desc_2")}
            </Typography.Paragraph>
          </div>
        </center>
      </DialogContent>
    </Dialog>
  );
};
