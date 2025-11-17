import { lazy, Suspense } from "react";

const HeaderSection = lazy(() =>
  import("@kindergarten-demo-day/sections/header").then((module) => ({
    default: module.Header,
  }))
);

const HeroSection = lazy(() =>
  import("@kindergarten-demo-day/sections/hero-section").then((module) => ({
    default: module.HeroSection,
  }))
);

const FooterSection = lazy(() =>
  import("@kindergarten-demo-day/sections/footer").then((module) => ({
    default: module.Footer,
  }))
);

const WelcomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex flex-col">
        <HeaderSection />
        <main className="flex-1">
          <HeroSection />
        </main>
        <FooterSection />
      </div>
    </Suspense>
  );
};

export const Component = WelcomePage;
