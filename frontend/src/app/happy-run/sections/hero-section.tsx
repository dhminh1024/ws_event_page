import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { HTMLAttributes, useEffect, useRef, type FC } from "react";

export type HeroSectionProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const HeroSection: FC<HeroSectionProps> = ({ className, ...props }) => {
  const event = useEventPageContext();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
      videoRef.current.addEventListener("loadedmetadata", () => {
        if (videoRef.current) {
          console.log("Loaded");
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });     
    }
  }, []);

  return (
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
      />
      <img
        className="w-full absolute top-0 left-0 z-5"
        src={event.variables.hero_image?.value}
        alt="hero"
      />
    </div>
  );
};
