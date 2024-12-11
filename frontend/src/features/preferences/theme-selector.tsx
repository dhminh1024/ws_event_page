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
import { Theme, useTheme } from "@/lib/shadcn/theme-provider";
import { useLocales } from "@/core/hooks/use-locales";

export type ThemeSelectProps = HTMLAttributes<HTMLDivElement> & {};

export const ThemeSelector: FC<ThemeSelectProps> = ({ className }) => {
  const { t } = useLocales();
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = (theme: Theme) => {
    // console.log(theme)
    setTheme(theme);
  };
  return (
    <div className={cn(className)}>
      <Select value={theme} onValueChange={handleChangeTheme}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select a mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            {t("components.inputs.theme.items.light_mode")}
          </SelectItem>
          <SelectItem value="dark">
            {t("components.inputs.theme.items.dark_mode")}
          </SelectItem>
          {/* <SelectItem value="system">System</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
};
