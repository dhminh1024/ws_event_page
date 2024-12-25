import type { FC } from "react";
import { Header } from "@/app/happy-box/sections/header";
import { BackgroundCoin } from "@happy-box/components/background";
import { GallerySection } from "@happy-box/sections/gallery-section";
import { ChallengeSection } from "@happy-box/sections/challenge-section";
import { Video } from "lucide-react";
import { VideoSection } from "../sections/video-section";
import Footer from "../sections/footer";

export const Component: FC = () => {
  return (
    <BackgroundCoin>
      <Header className="p-[20rem] px-[60rem] h-[140rem]"/>
      <GallerySection />
      <ChallengeSection />
      <VideoSection />
      <Footer />  
    </BackgroundCoin>
  );
};

Component.displayName = `Home Page`;
