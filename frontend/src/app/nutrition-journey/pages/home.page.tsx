import type { FC } from "react";
import { Header } from "@nutrition-journey/sections/header";
import { BackgroundCoin } from "@nutrition-journey/components/background";
import { MissionsSection } from "@/app/nutrition-journey/sections/missions-section";
import Footer from "../sections/footer";
import { Helmet } from "react-helmet";
import { useLocales } from "@/core/hooks/use-locales";
import env from "@/config/env";
import { TitleSection } from "../sections/title-section";
import { TargetSection } from "../sections/target-section";
import { RewardSection } from "../sections/reward-section";
import { LoginConfirmModal } from "../components/login-confirm-modal";

export const Component: FC = () => {
  const { t } = useLocales();
  return (
    <BackgroundCoin className="bg-white">
      <Helmet>
        <title>
          {t("common.home_page")} | {t("nutritional_journey.campaign_name")}
        </title>
      </Helmet>
      <Header className="px-80 py-40 md:py-80 md:px-240 md:h-560" />
      {/* <GallerySection /> */}
      <div className="flex flex-col gap-y-80 px-40 md:px-160 font-sans ">
        <TitleSection />
        <TargetSection />
        <MissionsSection />
        <RewardSection />
      </div>
      <Footer />
    </BackgroundCoin>
  );
};

Component.displayName = `Home Page`;
