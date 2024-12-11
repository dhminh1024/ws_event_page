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
import { Switch } from "@atoms/switch";
import { ANY } from "@/lib/utils/types";

export type ThemeSwitcherProps = HTMLAttributes<HTMLDivElement> & {};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = (theme: Theme) => {
    // console.log(theme)
    setTheme(theme);
  };
  return (
    <Switch
      className={cn(className)}
      checked={theme === "dark"}
      onCheckedChange={(checked: ANY) =>
        handleChangeTheme(checked ? "dark" : "light")
      }
    />
  );
};
