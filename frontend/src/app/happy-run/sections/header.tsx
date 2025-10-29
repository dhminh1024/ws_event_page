import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import LogoPrimary from "@happy-box/assets/images/logo_primary.webp";
import LogoHappyJourney from "@happy-box/assets/images/logo_happy_journey.webp";
import Typography from "@happy-box/components/typography";
import { LanguageSelector } from "@happy-box/components/language-selector";
import { useSettings } from "@/lib/auth/settings/use-settings";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";
import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { useNavigate } from "react-router-dom";
import { EVENT_PAGES } from "@/config/event-pages";
import { cleanPath } from "@/lib/utils/common";
import { MenuBar } from "./menu-bar";
import { LanguageSwitcher } from "../components/language-switcher";

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {};

export const Header: FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const { logout } = useAuthWSCode();
  const { t } = useLocales();
  const event = useEventPageContext();

  const handleLogout = () => {
    logout();
    navigate(cleanPath(`/${EVENT_PAGES.HAPPY_BOX.SITE_URL}/sign-in`));
  };
  // console.log(event);
  return (
    <div className={cn("bg-hr-primary pb-160", className)}>
      <div className="flex justify-between gap-x-40 md:gap-x-80 w-full py-40 md:py-120">
        <div className="flex items-center gap-x-40 md:gap-x-120">
          <img
            src={event.variables.logo_wellspring_white?.value}
            className="w-[25%] md:w-600 h-auto"
            alt="Logo"
          />
          <img
            src={event.variables.logo_happy_journey?.value}
            className="w-[20%] md:w-400 h-auto"
            alt="Logo"
          />
          <img
            src={event.variables.logo_happy_summer?.value}
            className="w-[18%] md:w-340 h-auto"
            alt="Logo summer"
          />
          <img
            src={event.variables.logo_spring_in_my_hands?.value}
            className="w-[14%] md:w-240 h-auto"
            alt="Logo spring"
          />
        </div>
        <div className="flex items-center md:hidden">
          <LanguageSwitcher className="w-120 h-80" />
        </div>
      </div>
    </div>
  );
};
