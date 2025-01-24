import { useTheme } from "@/lib/shadcn/theme-provider";
import Logo from "@atoms/logo";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@features/preferences/theme-toggle";
import { LanguageSwitcher } from "@features/preferences/language-switcher";
import { useSettings } from "@/lib/auth/settings/use-settings";
import { Outlet, useNavigate } from "react-router-dom";
import SignInButton from "../components/sign-in-button";

export const Component = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { default_homepage_url } = useSettings();
  console.log({ default_homepage_url });

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-orange-500">
      <div className="flex">
        <Logo
          className="w-32"
          variant={theme === "light" ? "default" : "white"}
        />
      </div>
      <h1>Wellspring Events</h1>
      <ThemeToggle className="bg-black/5 hover:bg-black/10 dark:bg-black/10 dark:hover:bg-black/20" />
      <LanguageSwitcher
        className="bg-black/5 hover:bg-black/10 dark:bg-black/10 dark:hover:bg-black/20"
        // variant="icon"
      />
      <h1>{t("components.notifications.events_empty.heading")}</h1>
      <h1>{default_homepage_url}</h1>
      <SignInButton />
      <Outlet />
    </div>
  );
};

Component.displayName = "AlbumPage";
