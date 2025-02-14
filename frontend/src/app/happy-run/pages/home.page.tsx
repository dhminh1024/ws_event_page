import type { FC } from "react";
import { Header } from "@happy-run/sections/header";
import Footer from "@happy-run/sections/footer";
import { Helmet } from "react-helmet";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import Typography from "@/app/happy-box/components/typography";
import { Link } from "react-router-dom";
import { HeroSection } from "@happy-run/sections/hero-section";

export const Component: FC = () => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  return (
    <div className="bg-hr-background">
      <Helmet>
        <title>
          {t("common.home_page")} |{" "}
          {currentLanguage === "en"
            ? event.variables.event_title_vn?.value
            : event.variables.event_title_en?.value}
        </title>
      </Helmet>
      <Header className="px-[20rem] md:px-[60rem]" />
      <HeroSection />
      {/* <GallerySection />
      <ChallengeSection />
      <VideoSection /> */}
      <center className="py-[40rem]">
        <Typography.Heading level={1} className="p-[40rem] text-center">
          COMING SOON
        </Typography.Heading>
        <Link
          to="order"
          className="text-[20rem] border-[2rem] p-[10rem] text-center"
        >
          Buy Ticket
        </Link>
      </center>
      <Footer />
    </div>
  );
};

Component.displayName = `Home Page`;
