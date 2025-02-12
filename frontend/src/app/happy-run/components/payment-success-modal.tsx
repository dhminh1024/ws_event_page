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
  disabled,
  onConfirm,
  onCancel,
  onClosed,
}) => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);

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
          "max-w-[680rem] w-full bg-hr-background shadow-none p-0",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="h-[100rem] bg-gray-400"></div>
        <center className="mb-[5rem]">
          <Typography.Heading
            className="py-[20rem] text-[25rem] text-hr-blue leading-[1.2] font-extrabold"
            level={2}
          >
            {parser(t("happy_run.form.payment_success_heading"))}
          </Typography.Heading>
          <Typography.Paragraph className="pb-[10rem] w-[45%] text-[16rem] text-hr-blue leading-[1.2]">
            {t("happy_run.form.payment_success_qr_guide")}:
          </Typography.Paragraph>

          <img className="w-[25%]" src={codeUrl} alt="QR Code" />
          <Button
            type="button"
            onClick={() => downloadQRCode()}
            className="my-[20rem] text-[16rem] px-[20rem] py-[20rem] hover:!bg-hr-blue/10  bg-hr-blue text-white rounded-[5rem]"
          >
            {t("happy_run.buttons.download_qr")}
          </Button>
          <Typography.Paragraph className="pb-[5rem]  text-[16rem] text-hr-blue leading-[1.2]">
            {t("happy_run.form.payment_success_desc_1")}
          </Typography.Paragraph>
          <Typography.Paragraph className="pb-[5rem]  text-[16rem] text-hr-blue leading-[1.2]">
            {t("happy_run.form.payment_success_desc_2")}
          </Typography.Paragraph>
        </center>
      </DialogContent>
    </Dialog>
  );
};
