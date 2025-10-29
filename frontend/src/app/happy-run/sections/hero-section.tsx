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
      <div className="w-full md:w-[90%] mx-auto bg-linear-to-b from-brand-teal to-brand-persian shadow-[inset_0rem_0rem_20rem_10rem_#00000055] p-40 rounded-[8rem] md:rounded-[25rem] my-40 md:my-200">
        <BorderWrapper
          dashedArray={isDesktop ? 16 : 10}
          radius={isDesktop ? 20 : 10}
          dashedOffset={10}
          strokeWidth={isDesktop ? 3 : 2}
          widthOffset={isDesktop ? 0.5 : 2}
          className="relative flex justify-between items-center py-40  md:py-160"
        >
          <div className="w-[30%] md:w-[20%]">
            <div className="absolute z-10 bottom-[-12.5%] md:bottom-[-5.5%] left-[0%] md:left-[3%] w-400 h-600 md:w-800 md:h-1200">
              <div
                ref={robotBodyRef}
                className="absolute rotate-[-10deg] origin-bottom left-0 bottom-[12%] right-0 m-auto z-10 "
              >
                <img
                  ref={LightEffectRef}
                  src={LightEffect}
                  className="absolute scale-0 origin-center right-[-22%] top-[-5%] z-20 w-[50%]"
                  alt="Camera"
                />
                <img src={RobotBodyImage} className="w-full" alt="Body" />
              </div>
              <img
                src={RobotLegsImage}
                className="absolute  bottom-0 right-[14%] w-[65%]"
                alt="Legs"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <Typography.Text className="text-[10rem] md:text-[28rem] text-hr-honey font-extrabold uppercase leading-40 md:leading-160 m-0">
                {t("happy_run.search_image_heading")}
              </Typography.Text>
              <Typography.Text className="text-[8rem] md:text-[20rem] md:mb-20 md:leading-92 font-semibold text-hr-honey ">
                {parser(t("happy_run.search_image_desc"))}
              </Typography.Text>
              <Typography.Text className="text-[8rem] md:text-[20rem] mb-20 md:leading-92 text-white italic">
                {parser(t("happy_run.search_image_note"))}
              </Typography.Text>
            </div>
            <Link
              to={event.variables.search_image_ai?.value || ""}
              target="_blank"
            >
              <Button className="text-[8rem] md:text-[20rem] mx-240 p-[3rem_20rem] md:p-[10rem_20rem] h-auto bg-hr-honey hover:bg-hr-honey/80 border-y-[2rem] md:border-t-[5rem] border-t-white/30 border-b-transparent shadow-none outline-hidden rounded-[5rem] italic">
                {t("happy_run.buttons.search_now")}
              </Button>
            </Link>
          </div>
        </BorderWrapper>
      </div>
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
