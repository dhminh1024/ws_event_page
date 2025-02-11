import type { FC } from "react";
import { Header } from "@/app/happy-box/sections/header";
import { BackgroundCoin } from "@happy-box/components/background";
import { GallerySection } from "@happy-box/sections/gallery-section";
import { ChallengeSection } from "@happy-box/sections/challenge-section";
import { Video } from "lucide-react";
import { VideoSection } from "../sections/video-section";
import Footer from "../sections/footer";
import { HeroSection } from "../sections/hero-section";
import { WelcomeModal } from "../components/welcome-modal";
import { ThankYouModal } from "../components/thank-you-modal";
import { Helmet } from "react-helmet";
import { useLocales } from "@/core/hooks/use-locales";
import env from "@/config/env";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

export const Component: FC = () => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  return (
    <div className="bg-hr-background">
      <Helmet>
        <title>
          {t("common.home_page")} | {currentLanguage === "en"
            ? event.variables.title_event_en?.value
            : event.variables.title_event_vn?.value}
        </title>
      </Helmet>
      <Header className="px-[20rem] py-[10rem] md:py-[20rem] md:px-[60rem] md:h-[140rem]" />
      {/* <GallerySection />
      <ChallengeSection />
      <VideoSection /> */}
      <Footer />
    </div>
  );
};

Component.displayName = `Home Page`;
