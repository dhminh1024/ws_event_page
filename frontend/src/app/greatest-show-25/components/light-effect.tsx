import { HTMLAttributes, useEffect, useRef, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import gsap from "gsap";
import LightEffectImage from "@greatest-show-25/assets/images/light.webp";

export type LightEffectProps = HTMLAttributes<HTMLImageElement> & {
  scaleTo?: number;
  scaleFrom?: number;
  opacityFrom?: number;
  opacityTo?: number;
  duration?: number;
  rotationDuration?: number;
};

export const LightEffect: FC<LightEffectProps> = ({
  className,
  scaleTo = 1.4,
  scaleFrom = 0.8,
  opacityFrom = 0.6,
  opacityTo = 1,
  duration = 2,
  rotationDuration = 6,
  ...props
}) => {
  const lightEffectRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lightEffectRef.current) return;

    // Random duration and delay for varied timing
    const randomDuration = duration + Math.random() * 1.5; // Random between duration and duration+1.5
    const randomDelay = Math.random() * 2; // Random delay 0-2 seconds

    // Zoom in/out effect with random timing
    const zoomAnimation = gsap.fromTo(
      lightEffectRef.current,
      {
        scale: scaleFrom,
        opacity: opacityFrom,
      },
      {
        scale: scaleTo,
        opacity: opacityTo,
        duration: randomDuration,
        delay: randomDelay,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      }
    );

    // Continuous rotation with random speed
    const randomRotationDuration = rotationDuration + Math.random() * 3; // Random rotation speed
    const rotationAnimation = gsap.to(lightEffectRef.current, {
      rotation: 360,
      duration: randomRotationDuration,
      repeat: -1,
      ease: "none",
    });

    // Cleanup function
    return () => {
      zoomAnimation.kill();
      rotationAnimation.kill();
    };
  }, [scaleTo, scaleFrom, opacityFrom, opacityTo, duration, rotationDuration]);

  return (
    <img
      ref={lightEffectRef}
      src={LightEffectImage}
      alt="Light Effect"
      className={cn("absolute", className)}
      {...props}
    />
  );
};
