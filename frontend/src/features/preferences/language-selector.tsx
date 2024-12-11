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
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select a mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vn">Tiếng Việt</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
