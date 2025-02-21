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
import { InfoSection } from "../sections/info-section";
import { StationSection } from "../sections/station-section";
import { SummerSection } from "../sections/summer-section";
import { FAQSection } from "../sections/faq-section";
import Scroll from "@/app/happy-box/components/smooth-scroll";
import { SpringSection } from "../sections/spring-section";

export const Component: FC = () => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  return (
    <div className="bg-hr-background rela">
      {/* <Scroll /> */}
      {/* <Helmet>
        <title>
          {t("common.home_page")} |{" "}
          {currentLanguage === "en"
            ? event.variables.event_title_vn?.value
            : event.variables.event_title_en?.value}
        </title>
      </Helmet> */}
      <Header className="px-[20rem] md:px-[60rem]" />
      <MenuBar className="mt-[-46rem] md:mt-[-55rem]"/>
      <HeroSection id="overview"/>
      <CountDownSection />
      <TeaserSection id="happy-run"/>
      <TargetSection />
      <RouteSection />
      <TicketSection />
      <KitSection />
      <InfoSection />
      {/* <StationSection />   */}
      <SummerSection id="happy-summer"/>
      <FAQSection id="faq"/>
      <SpringSection />
      <Footer />
    </div>
  );
};

Component.displayName = `Home Page`;
