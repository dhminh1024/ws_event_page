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
import { LunarButton } from "./button";
import env from "@/config/env";
import Typography from "./typography";
import { Label } from "@atoms/label";
import { generateArrayWithRandomLetters } from "../utils/ultils";
import { useLocales } from "@/core/hooks/use-locales";
import { LunarScroll } from "./scroll";
import { on } from "events";
import { set } from "lodash";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { useSettings } from "@/lib/auth/settings/use-settings";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { format } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@atoms/button";
import { Firework } from "./firework";
import { useSubmissions } from "../context/use-settings";

export type LunarModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    onConfirm?: (letter: string) => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const ThankYouModal: FC<LunarModalProps> = ({
  open: openValue,
  className,
  children,
  onConfirm,
  onCancel,
  onClosed,
}) => {
  const { t } = useLocales();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const event = useEventPageContext();
  const { showThankYouModal,setShowThankYouModal } = useSubmissions();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setShowThankYouModal(false);
      onClosed?.();
    }
  };

  useEffect(() => {
    if (showThankYouModal) {
      setIsOpen(showThankYouModal);
    }
  }, [showThankYouModal])
  

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-[480rem] mx-auto w-[92vw] bg-transparent border-none shadow-none",
          className
        )}
      >
        <div className="relative">
          <Firework className="z-50"/>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <Button
            className="absolute top-[-50rem] right-[10rem] md:right-[-30rem] w-[30rem] !bg-transparent h-[30rem] z-20 rounded-full"
            size={"icon"}
            variant={"outline"}
            onClick={() => handleOpenChange(false)}
          >
            <X className="!w-[20rem] !h-[20rem] text-white" />
          </Button>
          <LunarScroll scrollSize={isDesktop ? 30 : 20}>
            <div className="p-[20rem] md:px-[10rem]">
              <Typography.Paragraph className="text-[40rem] md:text-[60rem] leading-[1.2] mb-[10rem] text-center text-happy_box-light_red font-playlist">
                {t("happy_box.thankyou_modal_description_1")}
              </Typography.Paragraph>
              <Typography.Paragraph className="text-[16rem] md:text-[20rem] mb-[0rem] text-center text-happy_box-red">
                {t("happy_box.thankyou_modal_description_2")}
              </Typography.Paragraph>
              <Typography.Paragraph className="text-[16rem] md:text-[18rem] text-center text-happy_box-red">
                {t("happy_box.thankyou_modal_description_3")}
              </Typography.Paragraph>
            </div>
          </LunarScroll>
        </div>
      </DialogContent>
    </Dialog>
  );
};
