import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import LogoPrimary from "@happy-box/assets/images/logo_primary.avif";
import LogoHappyJourney from "@happy-box/assets/images/logo_happy_journey.avif";
import Typography from "@happy-box/components/typography";
import { LanguageSelector } from "@happy-box/components/language-selector";
import { useSettings } from "@/lib/auth/settings/use-settings";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";
import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { useNavigate } from "react-router-dom";
import { EVENT_PAGES } from "@/config/event-pages";
import { cleanPath } from "@/lib/utils/common";

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
    <div
      className={cn(
        "h-[100rem] flex justify-between gap-x-[10rem] md:gap-x-[20rem] shadow-[inset_0rem_-10rem_20rem_-10rem_#000]",
        className
      )}
    >
      <div className="flex items-center gap-x-[10rem] md:gap-x-[20rem]">
        <img
          src={event.variables.logo_wellspring_primary?.value}
          className="h-[50%] md:h-[70%] w-auto"
          alt="Logo"
        />
        <img
          src={event.variables.logo_happy_journey?.value}
          className="h-[45%] md:h-[60%] w-auto"
          alt="Logo"
        />
      </div>
      <div className="flex gap-x-[10rem] md:gap-x-[20rem] items-center">
        <Typography.Text
          onClick={handleLogout}
          className="text-[11rem] whitespace-nowrap md:text-[16rem] hover:underline text-happy_box-red cursor-pointer"
        >
          {t("common.sign_out")}
        </Typography.Text>
        <Typography.Text className="text-[11rem] md:text-[16rem]">|</Typography.Text>
        <div className="flex items-center gap-x-[20rem]">
          <Typography.Text className="hidden  md:inline text-[12rem] md:text-[16rem]">
            {t("common.language")}
          </Typography.Text>
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};
