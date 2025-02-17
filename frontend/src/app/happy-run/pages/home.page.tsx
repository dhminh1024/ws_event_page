import type { FC } from "react";
import { Header } from "@happy-run/sections/header";
import Footer from "@happy-run/sections/footer";
import { Helmet } from "react-helmet";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import Typography from "@/app/happy-box/components/typography";
import { Link } from "react-router-dom";
import { HeroSection } from "@happy-run/sections/hero-section";
import { MenuBar } from "../sections/menu-bar";
import { CountDownSection } from "../sections/count-down-section";
import { TeaserSection } from "../sections/teaser-section";
import { Target } from "phosphor-react";
import { TargetSection } from "../sections/target-section";
import { RouteSection } from "../sections/route.section";
import { TicketSection } from "../sections/ticket-section";
import { KitSection } from "../sections/kit-section";

export const Component: FC = () => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  return (
    <div className="bg-hr-background rela">
      {/* <Helmet>
        <title>
          {t("common.home_page")} |{" "}
          {currentLanguage === "en"
            ? event.variables.event_title_vn?.value
            : event.variables.event_title_en?.value}
        </title>
      </Helmet> */}
      <Header className="px-[20rem] md:px-[60rem]" />
      {/* <MenuBar className="mt-[-55rem]"/> */}

      {/* <HeroSection /> */}
      {/* <CountDownSection />
      <TeaserSection />
      <TargetSection />
      <RouteSection />
      <TicketSection /> */}
      {/* <KitSection /> */}
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
