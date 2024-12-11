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
import { Button } from "@atoms/button";
import { Moon, Sun } from "phosphor-react";
import { Tooltip } from "@atoms/tooltip";

export type ThemeToggleProps = HTMLAttributes<HTMLDivElement> & {};

export const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    const new_value: Theme = theme === "dark" ? "light" : "dark";
    setTheme(new_value);
  };
  return (
    <Button
      variant="ghost"
      size={"icon"}
      className={cn(className)}
      onClick={handleChangeTheme}
    >
      {theme === "light" && <Moon size={20} weight="light" />}
      {theme === "dark" && <Sun size={20} weight="light" />}
    </Button>
  );
};
