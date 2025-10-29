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

export type LunarModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    correctLetter?: string;
    disabled?: boolean;
    onConfirm?: (letter: string) => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const ChooseLetterModal: FC<LunarModalProps> = ({
  open: $open = false,
  correctLetter,
  className,
  children,
  disabled,
  onConfirm,
  onCancel,
  onClosed,
}) => {
  const { t } = useLocales();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const letters = useMemo(
    () => generateArrayWithRandomLetters(correctLetter || "?", 4),
    [correctLetter]
  );

  const handleOpenChange = (open: boolean) => {
    if (disabled) return;
    setIsOpen(open);
    if (!open) {
      onClosed?.();
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (selectedLetter) {
      onConfirm?.(selectedLetter);
    }
  };

  useEffect(() => {
    setIsOpen($open);
  },[$open])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-1920 w-full bg-transparent border-none shadow-none px-40",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <LunarScroll scrollSize={isDesktop ? 30 : 20}>
          <div className="p-80">
            <Typography.Paragraph className="text-[16rem] md:text-[20rem] mb-80 text-center text-happy_box-red">
              {t("happy_box.choose_first_letter")}
            </Typography.Paragraph>

            <fieldset className="my-120 flex flex-wrap justify-center gap-x-120">
              {letters.map((letter) => (
                <Label key={letter} className="cursor-pointer" htmlFor={letter}>
                  <input
                    type="radio"
                    value={letter}
                    name="first_letter"
                    id={letter}
                    className="hidden peer"
                    onChange={(e) => setSelectedLetter(e.target.value)}
                  />
                  <Typography.Text className="text-[16rem] md:text-[23rem] text-happy_box-red bg-white p-48 rounded-[5rem] border-[1rem] peer-checked:bg-[#FFE767]">
                    {letter}
                  </Typography.Text>
                </Label>
              ))}
            </fieldset>
            <div className="flex gap-x-40 justify-center">
              <LunarButton
                variant="primary"
                className="text-[16rem] md:text-[20rem]"
                onClick={handleConfirm}
              >
                {t("common.confirm")}
              </LunarButton>
              <LunarButton
                className="text-[16rem] md:text-[20rem]"
                onClick={() => handleOpenChange(false)}
              >
                {t("common.go_back")}
              </LunarButton>
            </div>
          </div>
        </LunarScroll>
      </DialogContent>
    </Dialog>
  );
};
