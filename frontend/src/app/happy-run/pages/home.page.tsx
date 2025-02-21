import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";

const HeaderSection = lazy(() =>
  import("@happy-run/sections/header").then((module) => ({
    default: module.Header,
  }))
);
const FooterSection = lazy(() => import("@happy-run/sections/footer"));
const HeroSection = lazy(() =>
  import("@happy-run/sections/hero-section").then((module) => ({
    default: module.HeroSection,
  }))
);
const MenuBar = lazy(() =>
  import("../sections/menu-bar").then((module) => ({ default: module.MenuBar }))
);
const CountDownSection = lazy(() =>
  import("../sections/count-down-section").then((module) => ({
    default: module.CountDownSection,
  }))
);
const TeaserSection = lazy(() =>
  import("../sections/teaser-section").then((module) => ({
    default: module.TeaserSection,
  }))
);
const TargetSection = lazy(() =>
  import("../sections/target-section").then((module) => ({
    default: module.TargetSection,
  }))
);
const RouteSection = lazy(() =>
  import("../sections/route.section").then((module) => ({
    default: module.RouteSection,
  }))
);
const TicketSection = lazy(() =>
  import("../sections/ticket-section").then((module) => ({
    default: module.TicketSection,
  }))
);
const KitSection = lazy(() =>
  import("../sections/kit-section").then((module) => ({
    default: module.KitSection,
  }))
);
const InfoSection = lazy(() =>
  import("../sections/info-section").then((module) => ({
    default: module.InfoSection,
  }))
);
const StationSection = lazy(() =>
  import("../sections/station-section").then((module) => ({
    default: module.StationSection,
  }))
);
const SummerSection = lazy(() =>
  import("../sections/summer-section").then((module) => ({
    default: module.SummerSection,
  }))
);
const FAQSection = lazy(() =>
  import("../sections/faq-section").then((module) => ({
    default: module.FAQSection,
  }))
);
const SpringSection = lazy(() =>
  import("../sections/spring-section").then((module) => ({
    default: module.SpringSection,
  }))
);

export const Component: FC = () => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  const { ref: TicketSectionRef, inView } = useInView({ triggerOnce: true });

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
        <HeaderSection className="px-[20rem] md:px-[60rem]" />
        <MenuBar className="mt-[-46rem] md:mt-[-55rem]" />
        <HeroSection id="overview" />
        <CountDownSection />
        <TeaserSection id="happy-run" />
        <TargetSection />
        <RouteSection />
        <TicketSection />
        <KitSection/>
        <InfoSection />
        <StationSection />
        <SummerSection id="happy-summer" />
        <FAQSection id="faq" />
        <SpringSection />
        <FooterSection />
      </div>
    </Suspense>
  );
};

Component.displayName = `Home Page`;
