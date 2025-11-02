import { useResponsive } from "@/core/hooks/use-reponsive";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface ScrollButtonProps extends HTMLAttributes<HTMLElement> {
  to: string;
}

export default function ScrollButton({
  to,
  children,
  ...props
}: PropsWithChildren<ScrollButtonProps>) {
  const { isDesktop } = useResponsive();

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
        section.getBoundingClientRect().top +
        window.scrollY -
        offset;

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: sectionTop, autoKill: true },
        ease: "power2.inOut",
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const section = document.getElementById(to);
    if (!section) return;
    scrollToSection(section);

    // Update hash without jumping
    if (window.history.pushState) {
      window.history.pushState(null, "", `#${to}`);
    } else {
      window.location.hash = to;
    }
  };

  const newChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onClick: handleClick,
      });
    }
    return child;
  });

  return <>{newChildren}</>;
}
