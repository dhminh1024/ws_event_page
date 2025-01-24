import type { FC } from "react";
import { Header } from "@nutrition-journey/sections/header";
import { BackgroundCoin } from "@nutrition-journey/components/background";
import { GallerySection } from "@nutrition-journey/sections/gallery-section";
import { ChallengeSection } from "@nutrition-journey/sections/challenge-section";
import { Video } from "lucide-react";
import { VideoSection } from "../sections/video-section";
import Footer from "../sections/footer";
import { HeroSection } from "../sections/hero-section";
import { WelcomeModal } from "../components/welcome-modal";
import { ThankYouModal } from "../components/thank-you-modal";
import { Helmet } from "react-helmet";
import { useLocales } from "@/core/hooks/use-locales";
import env from "@/config/env";

export const Component: FC = () => {
  const { t } = useLocales();
  return (
    <BackgroundCoin>
      <Helmet>
        <title>
          {t("common.home_page")} | {env.HAPPY_BOX.TITLE_PAGE}
        </title>
      </Helmet>
      <Header className="px-[20rem] py-[10rem] md:py-[20rem] md:px-[60rem] md:h-[140rem]" />
      {/* <GallerySection /> */}
      <ChallengeSection />
      {/* <VideoSection />  */}
      <Footer />
    </BackgroundCoin>
  );
};

Component.displayName = `Home Page`;
