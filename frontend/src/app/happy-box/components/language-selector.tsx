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
        <SelectTrigger className="text-[16rem] w-[150rem] h-[40rem] p-[10rem] bg-white rounded-[8rem]">
          <SelectValue className="" placeholder="Select a mode" />
        </SelectTrigger>
        <SelectContent className="max-h-none">
          <SelectItem className="text-[16rem] p-[10rem]" value="vn">
            Tiếng Việt
          </SelectItem>
          <SelectItem className="text-[16rem] p-[10rem]" value="en">
            English
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};