import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@atoms/select";
import { useTranslation } from "react-i18next";

export type LanguageSelectProps = HTMLAttributes<HTMLDivElement> & {};

export const LanguageSelector: FC<LanguageSelectProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className={cn(className)}>
      <Select value={i18n.language} onValueChange={handleChangeLanguage}>
        <SelectTrigger className="text-base md:text-lg text-black bg-white">
          <SelectValue className="" placeholder="Select a mode" />
        </SelectTrigger>
        <SelectContent className=" z-2001 max-h-none bg-white">
          <SelectItem
            className=" text-base md:text-lg bg-white! hover:bg-slate-200! text-black! cursor-pointer"
            value="vn"
          >
            Tiếng Việt
          </SelectItem>
          <SelectItem
            className="text-base md:text-lg bg-white! hover:bg-slate-200! text-black! cursor-pointer"
            value="en"
          >
            English
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
