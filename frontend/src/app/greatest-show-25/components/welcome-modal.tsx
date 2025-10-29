import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
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

export type LunarModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    correctLetter?: string;
    onConfirm?: (letter: string) => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const WelcomeModal: FC<LunarModalProps> = ({
  correctLetter,
  className,
  children,
  onConfirm,
  onCancel,
  onClosed,
}) => {
  const { t } = useLocales();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(true);
  const event = useEventPageContext();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onClosed?.();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          " max-w-1920 w-full bg-transparent border-none shadow-none px-40",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <Button
          className="absolute -top-200 right-40 md:-right-120 w-120 bg-transparent! h-120 z-20 rounded-full"
          size={"icon"}
          variant={"outline"}
          onClick={()=>handleOpenChange(false)}
        >
          <X className="w-[20rem]! h-80! text-white" />
        </Button>
        <LunarScroll scrollSize={isDesktop ? 30 : 20}>
          <div className="p-80">
            <Typography.Paragraph className="text-[16rem] md:text-[20rem] mb-0 text-center text-happy_box-red">
              {t("happy_box.welcome_modal_description_1")}
            </Typography.Paragraph>
            <Typography.Paragraph className="text-[24rem] md:text-[34rem] mb-40 text-center text-happy_box-light_red font-playlist">
              {t("happy_box.welcome_modal_description_2")}
              <span className="ml-32">
                {event.variables?.date_start?.value && format(
                  new Date(event.variables.date_start.value),
                  "dd/MM/yyyy"
                )}
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph className="text-[16rem] md:text-[20rem] text-center text-happy_box-red">
              {t("happy_box.welcome_modal_description_3")}
            </Typography.Paragraph>
          </div>
        </LunarScroll>
      </DialogContent>
    </Dialog>
  );
};
