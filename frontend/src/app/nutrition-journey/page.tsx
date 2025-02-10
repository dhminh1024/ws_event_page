import { useTheme } from "@/lib/shadcn/theme-provider";
import Logo from "@atoms/logo";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@features/preferences/theme-toggle";
import { LanguageSwitcher } from "@features/preferences/language-switcher";
import { useSettings } from "@/lib/auth/settings/use-settings";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SignInButton from "./components/sign-in-button";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { HeroSection } from "./sections/hero-section";
import { GallerySection } from "./sections/gallery-section";
import { TodayChallengeSection } from "./sections/today-challenge-section";
import { ChallengeSection } from "./sections/missions-section";
import { InstructionSection } from "./sections/instruction-section";
import { Helmet } from "react-helmet";

export const Component = () => {
  const { t } = useTranslation();

  const event = useEventPageContext();

  if (!event) {
    return <h1>No Event Found</h1>;
  }
  console.log(event);

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center">
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <HeroSection />

      <GallerySection />

      <TodayChallengeSection />

      <ChallengeSection />

      <InstructionSection />

      <ThemeToggle className="bg-black/5 hover:bg-black/10 dark:bg-black/10 dark:hover:bg-black/20" />
      <LanguageSwitcher
        className="bg-black/5 hover:bg-black/10 dark:bg-black/10 dark:hover:bg-black/20"
        // variant="icon"
      />
      <Outlet />
    </div>
  );
};

Component.displayName = "HappyBoxPage";
