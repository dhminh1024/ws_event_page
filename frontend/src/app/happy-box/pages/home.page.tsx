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

export const Component: FC = () => {
  return (
    <BackgroundCoin>
      <Header className="px-[20rem] py-[10rem] md:py-[20rem] md:px-[60rem] md:h-[140rem]"/>
      <GallerySection />
      <ChallengeSection />
      <VideoSection />
      <Footer />  
      {/* <WelcomeModal /> */}
      <ThankYouModal />
    </BackgroundCoin>
  );
};

Component.displayName = `Home Page`;
