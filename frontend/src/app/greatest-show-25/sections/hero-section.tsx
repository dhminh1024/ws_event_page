import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { HTMLAttributes, useEffect, useRef, type FC } from "react";
import { Link } from "react-router-dom";
import LightEffect from "@happy-run/assets/images/light-effect.webp";
import RobotLegsImage from "@happy-run/assets/images/robot-legs.webp";
import RobotBodyImage from "@happy-run/assets/images/robot-body.webp";
import RobotCameraImage from "@happy-run/assets/images/robot-camera.webp";
import { Button } from "@atoms/button";
import BorderWrapper from "@/app/happy-run/components/border-wrapper";
import { useResponsive } from "@/core/hooks/use-reponsive";
import Typography from "@/app/happy-run/components/typography";
import parser from "html-react-parser";
import { useLocales } from "@/core/hooks/use-locales";
import gsap from "gsap";

export type HeroSectionProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const HeroSection: FC<HeroSectionProps> = ({ className, ...props }) => {
  const { t } = useLocales();
  const event = useEventPageContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isDesktop } = useResponsive();
  const robotBodyRef = useRef<HTMLImageElement>(null);
  const LightEffectRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
      videoRef.current.addEventListener("loadeddata", () => {
        if (videoRef.current) {
          console.log("Loaded");
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
      if (robotBodyRef.current && LightEffectRef.current) {
        gsap.to(robotBodyRef.current, {
          rotation: 5,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          repeatDelay: 0.1,
        });
        gsap.to(LightEffectRef.current, {
          scale: 1.1,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          repeatDelay: 0.1,
        });
      }
    }
  }, []);

  return (
    <>
      <div className="relative w-full bg-hr-blue overflow-hidden" {...props}>
        <video
          ref={videoRef}
          className="relative z-20 w-full"
          poster={event.variables.hero_image?.value}
          src={event.variables.hero_kv?.value}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        />
        <img
          className="w-full absolute top-0 left-0 z-5"
          src={event.variables.hero_image?.value}
          alt="hero"
        />
      </div>
    </>
  );
};
