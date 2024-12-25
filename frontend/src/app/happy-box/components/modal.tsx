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

export type LunarModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    correctLetter?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClosed?: () => void;
  };

export const ChooseLetterModal: FC<LunarModalProps> = ({
  correctLetter,
  className,
  children,
  onConfirm,
  onCancel,
  onClosed
}) => {
  const { t } = useLocales();
  const [isOpen, setIsOpen] = useState(false);

  const letters = useMemo(
    () => generateArrayWithRandomLetters(correctLetter || "?", 4),
    [correctLetter]
  );

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onClosed?.();
    }
  }

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm?.();
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-[480rem] w-full bg-transparent border-none shadow-none px-[10rem]",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <LunarScroll>
          <div className="p-[20rem]">
            <Typography.Paragraph className="text-[20rem] mb-[20rem] text-center text-happy_box-red">
              {t("happy_box.choose_first_letter")}
            </Typography.Paragraph>

            <fieldset className="my-[30rem] flex flex-wrap justify-center gap-x-[30rem]">
              {letters.map((letter) => (
                <Label key={letter} className="cursor-pointer" htmlFor={letter}>
                  <input
                    type="radio"
                    value={letter}
                    name="first_letter"
                    id={letter}
                    className="hidden peer"
                  />
                  <Typography.Text className="text-[23rem] text-happy_box-red bg-white p-[12rem] rounded-[5rem] border-[1rem] peer-checked:bg-[#FFE767]">
                    {letter}
                  </Typography.Text>
                </Label>
              ))}
            </fieldset>
            <div className="flex gap-x-[10rem] justify-center">
              <LunarButton variant="primary" onClick={handleConfirm}>
                Xác nhận
              </LunarButton>
              <LunarButton onClick={()=>handleOpenChange(false)}>Trở lại</LunarButton>
            </div>
          </div>
        </LunarScroll>
      </DialogContent>
    </Dialog>
  );
};
