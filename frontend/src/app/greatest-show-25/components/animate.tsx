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

export const animateHeartbeat = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    scale?: number;
    duration?: number;
    repeat?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const scale = options?.scale || 1.1;
  const duration = options?.duration || 0.3;
  const repeat = options?.repeat ?? -1;
  const delay = options?.delay || 0;

  gsap.timeline({ repeat, repeatDelay: 0.5, delay })
    .to(el, {
      scale: scale,
      duration: duration,
      ease: "power2.in",
    })
    .to(el, {
      scale: 1,
      duration: duration,
      ease: "power2.out",
    })
    .to(el, {
      scale: scale * 0.95,
      duration: duration * 0.5,
      ease: "power2.in",
    })
    .to(el, {
      scale: 1,
      duration: duration * 0.5,
      ease: "power2.out",
    });
};

export const animateSoundbeat = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    scaleX?: number;
    scaleY?: number;
    duration?: number;
    repeat?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const scaleX = options?.scaleX || 1.05;
  const scaleY = options?.scaleY || 1.08;
  const duration = options?.duration || 0.6;
  const repeat = options?.repeat ?? -1;
  const delay = options?.delay || 0;

  // Create soundbeat effect with alternating scale pulses
  gsap.timeline({
    repeat,
    repeatDelay: 0.2,
    delay
  })
    .to(el, {
      scaleY: scaleY,
      scaleX: scaleX * 0.98,
      duration: duration * 0.4,
      ease: "power1.in",
    })
    .to(el, {
      scaleY: 1,
      scaleX: 1,
      duration: duration * 0.4,
      ease: "elastic.out(1, 0.3)",
    })
    .to(el, {
      scaleY: scaleY * 0.7,
      scaleX: scaleX * 0.99,
      duration: duration * 0.2,
      ease: "power1.in",
    })
    .to(el, {
      scaleY: 1,
      scaleX: 1,
      duration: duration * 0.3,
      ease: "elastic.out(1, 0.3)",
    });
};

export const animateWavebeat = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    scale?: number;
    rotation?: number;
    yoyo?: boolean;
    duration?: number;
    repeat?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const scale = options?.scale || 1.05;
  const rotation = options?.rotation || 3;
  const duration = options?.duration || 1.2;
  const repeat = options?.repeat ?? -1;
  const delay = options?.delay || 0;
  const yoyo = options?.yoyo ?? true;

  // Create wave-like oscillating effect with scale and rotation
  gsap.timeline({
    repeat,
    yoyo,
    delay,
    ease: "sine.inOut"
  })
    .to(el, {
      scale: scale,
      rotation: rotation,
      duration: duration / 4,
      ease: "sine.inOut",
    })
    .to(el, {
      scale: 1,
      rotation: -rotation,
      duration: duration / 2,
      ease: "sine.inOut",
    })
    .to(el, {
      scale: scale,
      rotation: rotation,
      duration: duration / 2,
      ease: "sine.inOut",
    })
    .to(el, {
      scale: 1,
      rotation: 0,
      duration: duration / 4,
      ease: "sine.inOut",
    });
};

export const animateFloatingWiggle = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    yDistance?: number;
    rotation?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const yDistance = options?.yDistance || 20;
  const rotation = options?.rotation || 15;
  const duration = options?.duration || 2;
  const delay = options?.delay || 0;

  // Floating up and down with wiggle rotation
  gsap.timeline({
    repeat: -1,
    yoyo: true,
    delay,
  })
    .to(el, {
      y: -yDistance,
      rotation: rotation,
      duration: duration / 2,
      ease: "power1.inOut",
    })
    .to(el, {
      y: yDistance,
      rotation: -rotation,
      duration: duration,
      ease: "power1.inOut",
    })
    .to(el, {
      y: 0,
      rotation: 0,
      duration: duration / 2,
      ease: "power1.inOut",
    });
};

export const animateBouncySpin = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    scaleMax?: number;
    rotation?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const scaleMax = options?.scaleMax || 1.15;
  const rotation = options?.rotation || 360;
  const duration = options?.duration || 3;
  const delay = options?.delay || 0;

  // Bouncy scale with full rotation
  gsap.timeline({
    repeat: -1,
    delay,
  })
    .to(el, {
      scale: scaleMax,
      rotation: rotation / 2,
      duration: duration / 3,
      ease: "back.out(1.7)",
    })
    .to(el, {
      scale: 1,
      rotation: rotation,
      duration: duration / 3,
      ease: "elastic.out(1, 0.5)",
    })
    .to(el, {
      scale: scaleMax * 0.9,
      rotation: rotation * 1.5,
      duration: duration / 3,
      ease: "power2.inOut",
    });
};

export const animateJellyWobble = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    skewAmount?: number;
    scaleX?: number;
    scaleY?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const skewAmount = options?.skewAmount || 10;
  const scaleX = options?.scaleX || 1.1;
  const scaleY = options?.scaleY || 0.9;
  const duration = options?.duration || 1.5;
  const delay = options?.delay || 0;

  // Jelly-like wobble effect
  gsap.timeline({
    repeat: -1,
    yoyo: true,
    delay,
  })
    .to(el, {
      scaleX: scaleX,
      scaleY: scaleY,
      skewX: skewAmount,
      duration: duration / 4,
      ease: "power1.inOut",
    })
    .to(el, {
      scaleX: scaleY,
      scaleY: scaleX,
      skewX: -skewAmount,
      duration: duration / 2,
      ease: "power1.inOut",
    })
    .to(el, {
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      duration: duration / 4,
      ease: "elastic.out(1, 0.3)",
    });
};

export const animateStrumming = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    xDistance?: number;
    yDistance?: number;
    scale?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const xDistance = options?.xDistance || 8;
  const yDistance = options?.yDistance || 10;
  const scale = options?.scale || 1.05;
  const duration = options?.duration || 2;
  const delay = options?.delay || 0;

  // Guitar/Pipa strumming motion - horizontal sway with bounce, no rotation
  gsap.timeline({
    repeat: -1,
    delay,
  })
    .to(el, {
      x: xDistance,
      y: -yDistance,
      scale: scale,
      duration: duration / 4,
      ease: "power1.inOut",
    })
    .to(el, {
      x: -xDistance,
      y: yDistance,
      scale: 1,
      duration: duration / 2,
      ease: "power1.inOut",
    })
    .to(el, {
      x: xDistance * 0.5,
      y: -yDistance * 0.5,
      scale: scale * 0.98,
      duration: duration / 4,
      ease: "power1.inOut",
    })
    .to(el, {
      x: 0,
      y: 0,
      scale: 1,
      duration: duration / 4,
      ease: "power1.out",
    });
};

export const animateMicRocking = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    rotation?: number;
    scale?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const rotation = options?.rotation || 15;
  const scale = options?.scale || 1.08;
  const duration = options?.duration || 2.5;
  const delay = options?.delay || 0;

  // Microphone rocking motion - like singing passionately
  gsap.timeline({
    repeat: -1,
    delay,
  })
    .to(el, {
      rotation: -rotation,
      scale: scale,
      duration: duration / 3,
      ease: "power1.inOut",
    })
    .to(el, {
      rotation: rotation,
      scale: 1,
      duration: duration / 3,
      ease: "power1.inOut",
    })
    .to(el, {
      rotation: -rotation * 0.6,
      scale: scale * 0.95,
      duration: duration / 6,
      ease: "power1.inOut",
    })
    .to(el, {
      rotation: 0,
      scale: 1,
      duration: duration / 6,
      ease: "power1.out",
    });
};

export const animateZoomBeat = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    scaleMin?: number;
    scaleMax?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const scaleMin = options?.scaleMin || 0.95;
  const scaleMax = options?.scaleMax || 1.08;
  const duration = options?.duration || 2;
  const delay = options?.delay || 0;

  // Smooth loop: Start from 1, zoom in, beat, zoom out, back to 1
  gsap.timeline({
    repeat: -1,
    delay,
  })
    // Slow zoom in to maximum from 1.0
    .to(el, {
      scale: scaleMax,
      duration: duration * 0.35,
      ease: "power1.inOut",
    })
    // Beat effect at peak - quick jitters
    .to(el, {
      scale: scaleMax * 0.92,
      duration: duration * 0.08,
      ease: "power2.in",
    })
    .to(el, {
      scale: scaleMax,
      duration: duration * 0.06,
      ease: "power2.out",
    })
    .to(el, {
      scale: scaleMax * 0.96,
      duration: duration * 0.06,
      ease: "power2.in",
    })
    // Return to max briefly
    .to(el, {
      scale: scaleMax,
      duration: duration * 0.05,
      ease: "power2.out",
    })
    // Slow zoom out to minimum
    .to(el, {
      scale: scaleMin,
      duration: duration * 0.2,
      ease: "power1.inOut",
    })
    // Smooth return to 1.0 for seamless loop
    .to(el, {
      scale: 1,
      duration: duration * 0.2,
      ease: "power1.inOut",
    });
};

export const animateSwaying = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    rotation?: number;
    xDistance?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const rotation = options?.rotation || 25;
  const xDistance = options?.xDistance || 15;
  const duration = options?.duration || 3;
  const delay = options?.delay || 0;

  // Swaying motion like a pendulum - đánh võng
  gsap.timeline({
    repeat: -1,
    delay,
  })
    .to(el, {
      rotation: rotation,
      x: xDistance,
      duration: duration / 2,
      ease: "sine.inOut",
    })
    .to(el, {
      rotation: -rotation,
      x: -xDistance,
      duration: duration,
      ease: "sine.inOut",
    })
    .to(el, {
      rotation: 0,
      x: 0,
      duration: duration / 2,
      ease: "sine.inOut",
    });
};

export const animateDrumBeat = (
  el: HTMLElement | SVGSVGElement | null,
  options?: {
    scaleHit?: number;
    rotation?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!el) return;

  const scaleHit = options?.scaleHit || 1.08;
  const rotation = options?.rotation || 5;
  const duration = options?.duration || 2;
  const delay = options?.delay || 0;

  // Drum beat rhythm - hiệu ứng đập trống
  gsap.timeline({
    repeat: -1,
    delay,
  })
    // Beat 1 - Strong hit
    .to(el, {
      scale: scaleHit,
      rotation: rotation,
      duration: duration * 0.1,
      ease: "power2.out",
    })
    .to(el, {
      scale: 1,
      rotation: 0,
      duration: duration * 0.15,
      ease: "elastic.out(1, 0.5)",
    })
    // Beat 2 - Medium hit
    .to(el, {
      scale: scaleHit * 0.9,
      rotation: -rotation * 0.7,
      duration: duration * 0.08,
      ease: "power2.out",
    })
    .to(el, {
      scale: 1,
      rotation: 0,
      duration: duration * 0.12,
      ease: "elastic.out(1, 0.5)",
    })
    // Pause
    .to(el, {
      scale: 1,
      rotation: 0,
      duration: duration * 0.55,
      ease: "none",
    });
};
