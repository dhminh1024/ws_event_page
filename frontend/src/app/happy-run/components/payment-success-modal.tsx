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

export const PaymentSuccessModal: FC<LunarModalProps> = ({
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

  const downloadQRCode = () => {
    if (codeUrl) saveAs(codeUrl, "QRCode.jpg");
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
          "max-w-3072 w-full bg-hr-background border-none shadow-none p-0",
          className
        )}
      >
        <DialogTitle hidden></DialogTitle>
        <DialogDescription hidden></DialogDescription>
        <img className="w-full" src={TopPageImage} alt="Top Page" />
        <center className="mb-20">
          <Typography.Heading
            className="py-80 md:py-60 text-[20rem] md:text-[24rem] text-hr-blue leading-[1.2] font-extrabold"
            level={2}
          >
            {parser(t("happy_run.form.payment_success_heading"))}
          </Typography.Heading>
          <Typography.Paragraph className="pb-20 w-full text-[15rem] md:text-[16rem] text-hr-blue leading-[1.2]">
            {t("happy_run.form.payment_success_qr_guide")}:
          </Typography.Paragraph>

          <img
            className="w-[40%] md:w-[15%] aspect-square border"
            src={codeUrl}
            alt="QR Code"
          />
          <Typography.Paragraph className="mt-40 font-bold w-full text-[12rem] md:text-[14rem] text-hr-blue leading-64">
            {`${settings?.bank_short_name} - ${settings?.account_number} - ${settings?.account_name}`}
          </Typography.Paragraph>
          <Typography.Paragraph className="mt-40 italic w-full text-[12rem] md:text-[14rem] text-hr-blue leading-64">
            {t("happy_run.form.transfer_content", { content: orderName })}
          </Typography.Paragraph>
          <div className="flex gap-x-40 justify-center">
            <Button
              type="button"
              onClick={() => downloadQRCode()}
              className="my-32 text-[12rem] md:text-[14rem] px-80 py-64 hover:bg-hr-blue/80!  bg-hr-blue text-white rounded-[5rem]"
            >
              {t("happy_run.buttons.download_qr")}
            </Button>
            <Link to={cleanPath(`/happy-run/order-detail/${orderName}`)} target="_blank">
              <Button
                type="button"
                className="my-32 text-[12rem] md:text-[14rem] px-80 py-64 hover:bg-hr-ember/80!  bg-hr-ember text-white rounded-[5rem]"
              >
                {t("happy_run.buttons.view_order")}
              </Button>
            </Link>
          </div>
          <div className="px-40">
            <Typography.Paragraph className="pb-20  text-[14rem] md:text-[15rem] text-hr-blue leading-[1.2]">
              {t("happy_run.form.payment_success_desc_1")}
            </Typography.Paragraph>
            <Typography.Paragraph className="pb-20 text-hr-ember text-[12rem] md:text-[15rem] leading-[1.2]">
              {parser(t("happy_run.form.payment_success_note"))}
            </Typography.Paragraph>
            <Typography.Paragraph className="pb-20  text-[15rem] md:text-[15rem] text-hr-blue leading-[1.2]">
              {t("happy_run.form.payment_success_desc_2")}
            </Typography.Paragraph>
          </div>
        </center>
      </DialogContent>
    </Dialog>
  );
};
