import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const animateZoomInOut = (
  el: HTMLElement | SVGSVGElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el) return;
  gsap.fromTo(
    el,
    { scale: 0.5, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        scrub: true,
        ...scrollConfig,
      },
    }
  );
};

export const animateZoomInBounce = (
  el: HTMLElement | SVGSVGElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el) return;
  gsap.fromTo(
    el,
    { scale: 0 },
    {
      scale: 1,
      duration: 1,
      ease: "bounce",
      scrollTrigger: {
        trigger: el,
        scrub: false,
        ...scrollConfig,
      },
    }
  );
};

export const animateFadeIn = (
  el: HTMLElement | SVGSVGElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el) return;
  gsap
    .timeline()
    .fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scrub: true,
        },
      }
    )
    .fromTo(
      el,
      { scale: 0.9 },
      {
        duration: 2,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scrub: true,
          markers: debug,
          ...scrollConfig,
        },
      }
    );
};

export const animateFadeInLeft = (
  el: HTMLElement | SVGSVGElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el) return;
  gsap
    .timeline()
    .fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scrub: true,
        },
      }
    )
    .fromTo(
      el,
      { x: -100 },
      {
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          scrub: true,
          markers: debug,
          ...scrollConfig,
        },
      }
    );
};

export const animateFadeInRight = (
  el: HTMLElement | SVGSVGElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el) return;
  gsap
    .timeline()
    .fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scrub: true,
        },
      }
    )
    .fromTo(
      el,
      { x: 100 },
      {
        x: 0,
        duration: 0.1,
        scrollTrigger: {
          trigger: el,
          scrub: 0.5,
          markers: debug,
          ...scrollConfig,
        },
      }
    )
    .timeScale(0.1);
};

export const animateFadeInBottom = (
  el: HTMLElement | SVGSVGElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el) return;
  gsap.fromTo(
    el,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.1,
      scrollTrigger: {
        trigger: el,
        scrub: true,
        markers: debug,
        ...scrollConfig,
      },
    }
  );
};

export const animateFadeInTop = (
  el: HTMLElement | SVGSVGElement | null,
  debug?: boolean
) => {
  if (!el) return;
  gsap.fromTo(
    el,
    { y: -100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.1,
      scrollTrigger: {
        trigger: el,
        scrub: true,
        markers: debug,
      },
    }
  );
};

export const drawSVG = (
  el?: SVGSVGElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el) return;
  const path = el.querySelector("mask path");
  if (!path) return;
  const pathLength = (path as SVGPathElement)?.getTotalLength();
  gsap.set(path as SVGPathElement, {
    strokeDasharray: `0,${pathLength}`,
  });
  gsap.to(path, {
    strokeDasharray: pathLength,
    scrollTrigger: {
      trigger: el,
      start: "top center",
      end: "top 10%",
      scrub: true,
      markers: debug,
      ...scrollConfig,
    },
  });
};

export const activeDashedRectSVG = (
  el?: SVGSVGElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el) return;
  const path = el.querySelector("rect");
  if (!path) return;
  const pathLength = (path as SVGPathElement)?.getTotalLength();
  // gsap.set(path as SVGPathElement, {
  //   strokeDasharray: pathLength,
  // });
  gsap.timeline({ repeat: -1 }).fromTo(
    path,
    {
      strokeDashoffset: pathLength,
    },
    {
      strokeDashoffset: 0,
      duration: 100,
      ease: "none",
    }
  );
};

export const animateBounceUp = (
  el: HTMLElement | SVGSVGElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el) return;
  gsap.fromTo(
    el,
    { rotateX: "-90deg" },
    {
      rotateX: "0deg",
      ease: "bounce",
      duration: 1,
      scrollTrigger: {
        trigger: el,
        scrub: false,
        ...scrollConfig,
      },
    }
  );
};

export const drawLineSVG = (
  el?: SVGSVGElement | null,
  path?: SVGPathElement | null,
  scrollConfig?: ScrollTrigger.Vars,
  debug?: boolean
) => {
  if (!el || !path) return;
  const pathLength = (path as SVGPathElement)?.getTotalLength();
  gsap.set(path as SVGPathElement, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });
  gsap.to(path, {
    strokeDashoffset: 0,
    scrollTrigger: {
      trigger: el,
      scrub: true,
      markers: debug,
      ...scrollConfig,
    },
  });
};
