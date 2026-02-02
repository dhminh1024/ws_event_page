import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { lazy, Suspense, useEffect } from "react";
import { useResponsive } from "@/core/hooks/use-reponsive";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useSmoothScroll } from "../hooks/use-smooth-scroll";

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
  const { isDesktop } = useResponsive();

  // Initialize smooth scroll
  useSmoothScroll();

  const scrollToSection = (section: HTMLElement) => {
    if (!section) return;

    // Get ScrollSmoother instance if it exists
    const smoother = ScrollSmoother.get();

    // Space in top offset
    const offset = isDesktop ? 150 : 60;

    if (smoother) {
      // Use ScrollSmoother's scrollTo method
      smoother.scrollTo(section, true, `top ${offset}px`);
    } else {
      // Fallback to gsap scrollTo for smooth animation
      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY - offset;

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: sectionTop, autoKill: true },
        ease: "power2.inOut",
      });
    }
  };

  // Handle hash navigation on page load
  useEffect(() => {
    setTimeout(() => {
      const hash = window.location.hash;
      if (!hash) return;
      const section = document.querySelector<HTMLElement>(hash);
      section && scrollToSection(section);
    }, 500);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div id="smooth-wrapper">
        <div id="smooth-content" className="bg-hr-background">
          <HeaderSection className="px-80 md:px-240" />
          <MenuBar className="-mt-184 md:-mt-220" />
          <HeroSection id="overview" />
          <CountDownSection />
          <TeaserSection id="happy-run" />
          <TargetSection />
          <RouteSection />
          <TicketSection />
          <KitSection />
          <InfoSection />
          <StationSection />
          <SummerSection id="happy-summer" />
          <FAQSection id="faq" />
          <SpringSection />
          <FooterSection />
        </div>
      </div>
    </Suspense>
  );
};

Component.displayName = `Home Page`;
