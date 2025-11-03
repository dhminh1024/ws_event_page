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
import RegisterSuccessHeading from "@greatest-show-25/assets/images/registration-success-heading.webp";
import { SecondaryButton } from "./button";
import SuccessFooterImage from "@greatest-show-25/assets/images/success-footer.webp";

export type OrderItemDetail = {
  name: string;
  ticket_class: string;
  distance: string;
  size: string;
  bib?: string;
  price: number;
};

export type ModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    codeUrl?: string;
    orderName?: string;
    disabled?: boolean;
    isSubmitting?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const RegistrationSuccessModal: FC<ModalProps> = ({
  open: $open = false,
  className,
  children,
  codeUrl,
  orderName,
  disabled,
  isSubmitting = false,
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
          "max-w-[1280px] w-full bg-hr-background border-none shadow-none p-0",
          className
        )}
      >
        <DialogTitle hidden></DialogTitle>
        <DialogDescription hidden></DialogDescription>

        {isSubmitting ? (
          <div className="px-[2%] py-[10%]">
            <center className="mb-20 px-[7%]">
              <div className="flex flex-col items-center justify-center gap-40">
                <div className="animate-spin rounded-full h-160 w-160 border-t-8 border-b-8 border-gs25-primary"></div>
                <Typography.Heading
                  className="text-[16rem] md:text-[24rem] text-gs-primary leading-[2] font-base"
                  level={2}
                >
                  {t("greatest_show_25.form.submitting")}
                </Typography.Heading>
              </div>
            </center>
          </div>
        ) : (
          <>
            <div className="px-[2%]">
              <img
                className="w-full"
                src={RegisterSuccessHeading}
                alt="Top Page"
              />
              <center className="mb-20 px-[2%]">
                <Typography.Heading
                  className="text-[13rem] md:text-[18rem] text-gs-primary leading-[2] font-base"
                  level={2}
                >
                  {parser(t("greatest_show_25.form.success_text_1"))}
                </Typography.Heading>
                <Typography.Heading
                  className="text-[13rem] md:text-[18rem] text-gs-primary leading-[2] font-base"
                  level={2}
                >
                  {parser(t("greatest_show_25.form.success_text_2"))}
                </Typography.Heading>
                <Typography.Heading
                  className="text-[13rem] md:text-[18rem] text-gs-primary leading-[2] font-base"
                  level={2}
                >
                  {parser(t("greatest_show_25.form.success_text_3"))}
                </Typography.Heading>
                <Typography.Heading
                  className="text-[13rem] md:text-[18rem] text-gs-primary leading-[2] font-base"
                  level={2}
                >
                  {parser(t("greatest_show_25.form.success_text_4"))}
                </Typography.Heading>
                <Typography.Heading
                  className="text-[13rem] md:text-[18rem] text-gs-primary leading-[2] font-base"
                  level={2}
                >
                  {parser(t("greatest_show_25.form.success_text_5"))}
                </Typography.Heading>
                <center className="mt-[20rem]">
                  <SecondaryButton
                    className={cn(
                      "text-[14rem] bg-transparent text-center md:text-[20rem] font-base italic p-[20rem_30rem] md:p-[25rem_30rem] md:rounded-[13rem] flex items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                    )}
                    onClick={handleConfirm}
                  >
                    {t("greatest_show_25.buttons.back_to_home")}
                  </SecondaryButton>
                </center>
              </center>
            </div>
            <img className="w-full" src={SuccessFooterImage} alt="Footer" />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
