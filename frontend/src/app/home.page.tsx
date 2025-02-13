import { useTheme } from "@/lib/shadcn/theme-provider";
import Logo from "@atoms/logo";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@features/preferences/theme-toggle";
import { LanguageSwitcher } from "@features/preferences/language-switcher";
import { useSettings } from "@/lib/auth/settings/use-settings";
import { Navigate } from "react-router-dom";

export const Component = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { default_homepage_url } = useSettings();

  if (default_homepage_url) {
    return <Navigate replace to={default_homepage_url} />;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Logo
        className="w-32"
        variant={theme === "light" ? "default" : "white"}
      />
      <h1>Wellspring Events</h1>
      <ThemeToggle className="bg-black/5 hover:bg-black/10 dark:bg-black/10 dark:hover:bg-black/20" />
      <LanguageSwitcher
        className="bg-black/5 hover:bg-black/10 dark:bg-black/10 dark:hover:bg-black/20"
        // variant="icon"
      />
      <h1>{t("components.notifications.events_empty.heading")}</h1>
    </div>
  );
};

Component.displayName = "HomePage";