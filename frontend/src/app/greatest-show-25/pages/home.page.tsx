import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { lazy, Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { BackgroundGradient } from "../components/background";
import { useResponsive } from "@/core/hooks/use-reponsive";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
const HeaderSection = lazy(() =>
  import("@greatest-show-25/sections/header").then((module) => ({
    default: module.Header,
  }))
);
const FooterSection = lazy(() => import("@greatest-show-25/sections/footer"));
const HeroSection = lazy(() =>
  import("@greatest-show-25/sections/hero-section").then((module) => ({
    default: module.HeroSection,
  }))
);
const MenuBar = lazy(() =>
  import("@greatest-show-25/sections/menu-bar").then((module) => ({
    default: module.MenuBar,
  }))
);
const CountDownSection = lazy(() =>
  import("@greatest-show-25/sections/count-down-section").then((module) => ({
    default: module.CountDownSection,
  }))
);
const TeaserSection = lazy(() =>
  import("@greatest-show-25/sections/teaser-section").then((module) => ({
    default: module.TeaserSection,
  }))
);
const TargetSection = lazy(() =>
  import("@greatest-show-25/sections/target-section").then((module) => ({
    default: module.TargetSection,
  }))
);
const EntryCategoriesSection = lazy(() =>
  import("@/app/greatest-show-25/sections/entry-categories-section").then(
    (module) => ({
      default: module.EntryCategoriesSection,
    })
  )
);
const AwardsSection = lazy(() =>
  import("@greatest-show-25/sections/awards-section").then((module) => ({
    default: module.AwardsSection,
  }))
);
const JourneySection = lazy(() =>
  import("@greatest-show-25/sections/journey-section").then((module) => ({
    default: module.JourneySection,
  }))
);
const FAQSection = lazy(() =>
  import("@greatest-show-25/sections/faq-section").then((module) => ({
    default: module.FAQSection,
  }))
);
const PhotosSection = lazy(() =>
  import("@greatest-show-25/sections/photos-section").then((module) => ({
    default: module.PhotosSection,
  }))
);
const ContactSection = lazy(() =>
  import("@greatest-show-25/sections/contact-section").then((module) => ({
    default: module.ContactSection,
  }))
);

export const Component: FC = () => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  const { isDesktop } = useResponsive();

  const scrollToSection = (section: HTMLElement) => {
    if (!section) return;
    console.log("smooth scroll to section:", section.id);

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

  useEffect(() => {
    setTimeout(() => {
      // Get hash from URL
      const hash = window.location.hash;
      if (!hash) return;
      const section = document.querySelector<HTMLElement>(hash);
      section && scrollToSection(section);
    }, 500);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BackgroundGradient className="relative">
        <HeaderSection className="px-80 md:px-240" />
        <MenuBar className="-mt-184 md:-mt-220" />
        <HeroSection id="overview" />
        <CountDownSection />
        <TeaserSection id="happy-run" />
        <TargetSection />
        <EntryCategoriesSection />
        <AwardsSection />
        <JourneySection />
        <FAQSection />
        <PhotosSection />
        <ContactSection />
        <FooterSection />
      </BackgroundGradient>
    </Suspense>
  );
};

Component.displayName = `Home Page`;
