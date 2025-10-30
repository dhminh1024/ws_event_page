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
    // Create ScrollSmoother instance
    smootherRef.current = ScrollSmoother.create({
      smooth: options?.smooth ?? 1.5,
      effects: options?.effects ?? true,
      smoothTouch: options?.smoothTouch ?? true,
    });

    // Cleanup on unmount
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  return smootherRef.current;
};
