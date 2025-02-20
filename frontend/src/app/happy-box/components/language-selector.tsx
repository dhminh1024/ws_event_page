import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useTranslation } from "react-i18next";

export type LanguageSelectProps = HTMLAttributes<HTMLDivElement> & {};

export const LanguageSelector: FC<LanguageSelectProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className={cn(className)}>
      <Select value={i18n.language} onValueChange={handleChangeLanguage} >
        <SelectTrigger className="text-[10rem] md:text-[16rem] md:w-[150rem] h-[25rem] md:h-[40rem] p-[8rem] bg-white rounded-[4rem] md:rounded-[8rem]">
          <SelectValue className="" placeholder="Select a mode" />
        </SelectTrigger>
        <SelectContent className="max-h-none bg-white">
          <SelectItem className=" text-[10rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-happy_box-foreground cursor-pointer" value="vn">
            Tiếng Việt
          </SelectItem>
          <SelectItem className="text-[10rem] md:text-[16rem] p-[10rem] !bg-white hover:!bg-slate-200 !text-happy_box-foreground cursor-pointer" value="en">
            English
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
