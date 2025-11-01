import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";
import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { useNavigate } from "react-router-dom";
import { EVENT_PAGES } from "@/config/event-pages";
import { cleanPath } from "@/lib/utils/common";
import LogoWhitedPrimary from "@greatest-show-25/assets/images/logo-white.png";
import LogoJourney from "@greatest-show-25/assets/images/logo-hj.png";
import GSLogo from "@greatest-show-25/assets/images/gs-logo.webp";
import { LanguageSwitcher } from "../components/language-switcher";
import { LanguageSelector } from "../components/language-selector";

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
    <div className={cn("bg-hr-primary pb-160 relative", className)}>
      <div className="flex justify-between gap-x-40 md:gap-x-80 w-full h-full py-40 md:py-[35rem]">
        <div className="flex w-full h-160 md:h-320 gap-x-0 md:gap-x-160 items-center">
          <img
            src={LogoWhitedPrimary}
            className="h-full w-auto mr-80"
            alt="Wellspring Logo"
          />
          <img
            src={LogoJourney}
            className="h-[80%] w-auto"
            alt="Happy Journey Logo"
          />
        </div>
        <div className="flex items-center">
          {/* <LanguageSwitcher className="w-120 h-80" /> */}
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};
