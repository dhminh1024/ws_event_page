import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export const useSmoothScroll = (options?: {
  smooth?: number;
  effects?: boolean;
  smoothTouch?: boolean | number;
}) => {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Delay to ensure all ScrollTrigger pins are created first
    const timer = setTimeout(() => {
      // Create ScrollSmoother instance
      smootherRef.current = ScrollSmoother.create({
        smooth: options?.smooth ?? 1.5,
        effects: options?.effects ?? true,
        smoothTouch: options?.smoothTouch ?? true,
        normalizeScroll: true, // Prevent scroll jank with pinned elements
      });

      // Refresh all ScrollTriggers after ScrollSmoother is created
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, [options?.smooth, options?.effects, options?.smoothTouch]);

  return smootherRef.current;
};
