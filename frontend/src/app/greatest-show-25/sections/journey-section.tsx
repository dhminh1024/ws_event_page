import { HTMLAttributes, useEffect, useRef, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import Typography from "..//components/typography";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import JourneyRoadImage from "../assets/images/journey-road.png";
import Round1SilkPathImage from "../assets/images/round-1-slik-path.png";
import Round2SilkPathImage from "../assets/images/round-2-slik-path.png";
import Round3SilkPathImage from "../assets/images/round-3-slik-path.png";

import Round2Image from "../assets/images/journey-round-2-mb.png";
import Round3Image from "../assets/images/journey-round-3-mb.png";

import Round1Logo from "../assets/images/journey-round-1-logo.png";
import Round2Logo from "../assets/images/journey-round-2-logo.png";
import Round3Logo from "../assets/images/journey-round-3-logo.png";
// Import 8 material images
import Material1Image from "../assets/images/material-1.png";
import Material2Image from "../assets/images/material-2.png";
import Material3Image from "../assets/images/material-3.png";
import Material4Image from "../assets/images/material-4.png";
import Material5Image from "../assets/images/material-5.png";
import Material6Image from "../assets/images/material-6.png";
import Material7Image from "../assets/images/material-7.png";
import Material8Image from "../assets/images/material-8.png";
import {
  animateFadeInBottom,
  animateFadeInLeft,
  animateFadeInRight,
  animateZoomInOut,
  animateFloatingWiggle,
  animateSwaying,
  animateMicRocking,
  animateZoomBeat,
  animateDrumBeat,
} from "../components/animate";
import { useInView } from "react-intersection-observer";
import parser from "html-react-parser";
import {
  PrimaryButton,
  SecondaryButton,
  ThirdaryButton,
} from "../components/button";
import { Link } from "react-router-dom";
import { useResponsive } from "@/core/hooks/use-reponsive";

export type JourneySectionProps = HTMLAttributes<HTMLDivElement> & {};

export const JourneySection: FC<JourneySectionProps> = ({
  className,
  ...props
}) => {
  const { ref: myRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });
  const { isDesktop } = useResponsive();
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const textDescRef = useRef(null);

  const Round1LogoRef = useRef(null);
  const Round2LogoRef = useRef(null);
  const Round3LogoRef = useRef(null);

  const material1Ref = useRef(null);
  const material2Ref = useRef(null);
  const material3Ref = useRef(null);
  const material4Ref = useRef(null);
  const material5Ref = useRef(null);
  const material6Ref = useRef(null);
  const material7Ref = useRef(null);
  const material8Ref = useRef(null);

  useEffect(() => {
    if (!inView) return;
    setTimeout(() => {
      animateFadeInLeft(text1Ref.current, {
        start: "top 100%",
        end: "top 50%",
      });
      animateFadeInRight(text2Ref.current, {
        start: "top 100%",
        end: "top 50%",
      });
      animateZoomInOut(textDescRef.current, {
        start: "top 100%",
        end: "top 50%",
      });

      // Fun animations for material images
      animateFloatingWiggle(material1Ref.current, {
        yDistance: 12,
        rotation: 8,
        duration: 4,
        delay: 0.3,
      });

      // Pipa swaying animation - đánh võng
      animateSwaying(material2Ref.current, {
        rotation: 20,
        xDistance: 12,
        duration: 4,
        delay: 0.5,
      });

      // Microphone rocking animation
      animateMicRocking(material3Ref.current, {
        rotation: 10,
        scale: 1.04,
        duration: 5,
        delay: 0.7,
      });

      // Drum beat animation
      animateDrumBeat(material4Ref.current, {
        scaleHit: 1.1,
        rotation: 8,
        duration: 3,
        delay: 0.6,
      });

      // Guitar swaying animation
      animateSwaying(material5Ref.current, {
        rotation: 15,
        xDistance: 10,
        duration: 4,
        delay: 0.4,
      });

      // Flag waving animation
      animateSwaying(material6Ref.current, {
        rotation: 12,
        xDistance: 10,
        duration: 4,
        delay: 0.5,
      });

      // Drum stick rocking animation
      animateDrumBeat(material7Ref.current, {
        scaleHit: 1.1,
        rotation: 8,
        duration: 3,
        delay: 0.6,
      });

      // Saxophone swaying animation
      animateSwaying(material8Ref.current, {
        rotation: 10,
        xDistance: 8,
        duration: 4,
        delay: 2.4,
      });

      // Round 1 Logo zoom beat animation
      animateZoomBeat(Round1LogoRef.current, {
        scaleMin: 0.96,
        scaleMax: 1.06,
        duration: 4,
        delay: 0.2,
      });
      // Round 2 Logo zoom beat animation
      animateZoomBeat(Round2LogoRef.current, {
        scaleMin: 0.96,
        scaleMax: 1.06,
        duration: 4,
        delay: 0.2,
      });
      // Round 3 Logo zoom beat animation
      animateZoomBeat(Round3LogoRef.current, {
        scaleMin: 0.96,
        scaleMax: 1.06,
        duration: 4,
        delay: 0.2,
      });
    }, 200);
  }, [inView]);

  return (
    <div
      id="journey"
      ref={myRef}
      className={cn("text-center py-40", className)}
      {...props}
    >
      {inView && (
        <>
          <h2
            ref={textDescRef}
            className="pt-20 md:pt-160 mb-40 md:mb-120 font-ethnocentric bg-gs25-gradient-4 bg-clip-text text-transparent text-[25rem] md:text-[55rem] uppercase font-normal
             flex items-center justify-center"
          >
            {t("greatest_show_25.journey_section_heading")}
          </h2>
          <div className="flex justify-center relative md:pb-1200">
            {isDesktop && (
              <img
                src={JourneyRoadImage}
                alt="Journey Road"
                className="w-full"
              />
            )}
            <div className="flex flex-col md:flex-row">
              {/* Milestone 1: Within Me */}
              <div className="">
                <div className={cn({ relative: !isDesktop })}>
                  {!isDesktop && (
                    <img
                      src={Round1SilkPathImage}
                      alt="Journey Road"
                      className="w-full mb-40"
                    />
                  )}
                  <img
                    ref={Round1LogoRef}
                    src={Round1Logo}
                    className="w-[45%] md:w-[25%] h-auto bottom-0 md:top-[12%] left-0 md:left-[-2%] absolute"
                    alt="Round 1 Logo"
                  />
                  <img
                    ref={material1Ref}
                    src={Material1Image}
                    className="w-[11%] md:w-[9%] h-auto top-[12%] md:top-[5%] left-[14%] absolute"
                    alt="Material 1"
                  />
                  <img
                    ref={material2Ref}
                    src={Material2Image}
                    className="w-[14%] h-auto top-[2%] md:top-[0%] md:left-[45%] left-[45%] absolute"
                    alt="Material 2"
                  />
                  <img
                    ref={material3Ref}
                    src={Material3Image}
                    className="w-[12%] md:w-[10%] h-auto top-[11%] md:top-[6%] left-[82%] absolute"
                    alt="Material 3"
                  />
                </div>
                <div
                  className="w-full md:absolute text-left"
                  style={{
                    marginTop: !isDesktop ? "-90rem" : "0",
                    top: "16%",
                    right: "5%",
                    width: isDesktop ? "55%" : "100%",
                  }}
                >
                  <Typography.Heading
                    className="text-gs25-primary md:leading-180! mb-70 md:mb-100 font-extrabold leading-90! text-[17rem] md:text-[36rem] "
                    style={{
                      paddingLeft: !isDesktop ? "45%" : "0",
                    }}
                  >
                    {parser(
                      currentLanguage === "vn"
                        ? event.variables.journey_item_1_title_vn?.value || ""
                        : event.variables.journey_item_1_title_en?.value || ""
                    )}
                  </Typography.Heading>
                  <Typography.Paragraph className="text-gs25-secondary px-140 md:px-0 leading-70! md:leading-130! text-[11rem] md:text-[19rem]">
                    {parser(
                      currentLanguage === "vn"
                        ? event.variables.journey_item_1_desc_vn?.value || ""
                        : event.variables.journey_item_1_desc_en?.value || ""
                    )}
                  </Typography.Paragraph>
                  <div
                    className="flex gap-x-40 md:gap-x-80 mt-60 px-140 md:px-0"
                    style={{
                      justifyContent: !isDesktop ? "flex-end" : "flex-start",
                    }}
                  >
                    <Link to="/round-detail/within-me">
                      <SecondaryButton className="text-white px-60 md:px-120 py-20 md:h-140 md:rounded-[8rem] italic text-[11rem] md:text-[18rem]">
                        {t("greatest_show_25.buttons.entry_rules")}
                      </SecondaryButton>
                    </Link>
                    <Link to="#">
                      <ThirdaryButton className="text-white px-60 md:px-120 py-20 md:h-140 md:rounded-[8rem] italic text-[11rem] md:text-[18rem]">
                        {t("greatest_show_25.buttons.entry_results")}
                      </ThirdaryButton>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Milestone 2: Where Am I */}
              <div className="">
                <div className={cn({ relative: !isDesktop })}>
                  {!isDesktop && (
                    <img
                      src={Round2SilkPathImage}
                      alt="Journey Road"
                      className="w-full mb-40"
                    />
                  )}
                  <img
                    ref={Round2LogoRef}
                    src={Round2Logo}
                    className="w-[40%] md:w-[25%] h-auto bottom-0 md:top-[35%] right-0 absolute"
                    alt="Round 2 Logo"
                  />
                  <img
                    ref={material4Ref}
                    src={Material4Image}
                    className="w-[12%] md:w-[8%] h-auto top-[40%] md:top-[35%] left-[10%] md:left-[20%] absolute"
                    alt="Material 4"
                  />
                  <img
                    ref={material5Ref}
                    src={Material5Image}
                    className="w-[18%] md:w-[12%] h-auto top-[28%] md:top-[35%] left-[43%] md:left-[59%] absolute"
                    alt="Material 5"
                  />
                </div>

                <div
                  className="w-full md:absolute text-left"
                  style={{
                    marginTop: !isDesktop ? "-55rem" : "0",
                    top: "45%",
                    left: "10%",
                    width: isDesktop ? "55%" : "100%",
                  }}
                >
                  <Typography.Heading
                    className="text-gs25-primary md:leading-180! mb-70 md:mb-100 font-extrabold leading-90! text-[17rem] md:text-[36rem] "
                    style={{
                      paddingLeft: !isDesktop ? "8%" : "0",
                      paddingRight: !isDesktop ? "40%" : "0",
                    }}
                  >
                    {parser(
                      currentLanguage === "vn"
                        ? event.variables.journey_item_2_title_vn?.value || ""
                        : event.variables.journey_item_2_title_en?.value || ""
                    )}
                  </Typography.Heading>
                  <Typography.Paragraph className="text-gs25-secondary px-140 md:px-0 leading-70! md:leading-130! text-[11rem] md:text-[19rem]">
                    {parser(
                      currentLanguage === "vn"
                        ? event.variables.journey_item_2_desc_vn?.value || ""
                        : event.variables.journey_item_2_desc_en?.value || ""
                    )}
                  </Typography.Paragraph>
                  <div className="flex gap-x-40 md:gap-x-80 mt-60 px-140 md:px-0">
                    <Link to="/round-detail/where-am-i">
                      <SecondaryButton className="text-white px-60 md:px-120 py-20 md:h-140 md:rounded-[8rem] italic text-[11rem] md:text-[18rem]">
                        {t("greatest_show_25.buttons.entry_rules")}
                      </SecondaryButton>
                    </Link>
                    <Link to="#">
                      <ThirdaryButton className="text-white px-60 md:px-120 py-20 md:h-140 md:rounded-[8rem] italic text-[11rem] md:text-[18rem]">
                        {t("greatest_show_25.buttons.entry_results")}
                      </ThirdaryButton>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Milestone 3: Here I Am */}
              <div className="">
                <div className={cn({ relative: !isDesktop })}>
                  {!isDesktop && (
                    <img
                      src={Round3SilkPathImage}
                      alt="Journey Road"
                      className="w-full mb-40"
                    />
                  )}
                  <img
                    ref={Round3LogoRef}
                    src={Round3Logo}
                    className="w-[50%] md:w-[25%] h-auto bottom-0 md:top-[68%] left-0 md:left-[2%] absolute"
                    alt="Round 3 Logo"
                  />
                  <img
                    ref={material6Ref}
                    src={Material6Image}
                    className="w-[14%] md:w-[10%] h-auto top-[0%] md:top-[54%] right-[5%] md:right-[5%] absolute"
                    alt="Material 6"
                  />
                  <img
                    ref={material7Ref}
                    src={Material7Image}
                    className="w-[16%] h-auto top-[25%] md:top-[59%] md:right-[20%] right-[17%] absolute"
                    alt="Material 7"
                  />
                  <img
                    ref={material8Ref}
                    src={Material8Image}
                    className="w-[14%] h-auto top-[28%] md:top-[65%] left-[45%] md:left-[30%] absolute"
                    alt="Material 8"
                  />
                </div>

                <div
                  className="w-full md:absolute text-left"
                  style={{
                    marginTop: !isDesktop ? "-25rem" : "0",
                    top: "78%",
                    right: "5%",
                    width: isDesktop ? "55%" : "100%",
                  }}
                >
                  <Typography.Heading
                    className="text-gs25-primary md:leading-180! mb-70 md:mb-100 font-extrabold leading-90! text-[17rem] md:text-[36rem] "
                    style={{
                      paddingLeft: !isDesktop ? "8%" : "0",
                      paddingRight: !isDesktop ? "20%" : "0",
                    }}
                  >
                    {parser(
                      currentLanguage === "vn"
                        ? event.variables.journey_item_3_title_vn?.value || ""
                        : event.variables.journey_item_3_title_en?.value || ""
                    )}
                  </Typography.Heading>
                  <Typography.Paragraph className="text-gs25-secondary px-140 md:px-0 leading-70! md:leading-130! text-[11rem] md:text-[19rem]">
                    {parser(
                      currentLanguage === "vn"
                        ? event.variables.journey_item_3_desc_vn?.value || ""
                        : event.variables.journey_item_3_desc_en?.value || ""
                    )}
                  </Typography.Paragraph>
                  <div className="flex gap-x-40 md:gap-x-80 mt-60 px-140 md:px-0">
                    <Link to="/round-detail/here-i-am">
                      <SecondaryButton className="text-white px-60 md:px-120 py-20 md:h-140 md:rounded-[8rem] italic text-[11rem] md:text-[18rem]">
                        {t("greatest_show_25.buttons.entry_rules")}
                      </SecondaryButton>
                    </Link>
                    <Link to="#">
                      <ThirdaryButton className="text-white px-60 md:px-120 py-20 md:h-140 md:rounded-[8rem] italic text-[11rem] md:text-[18rem]">
                        {t("greatest_show_25.buttons.entry_results")}
                      </ThirdaryButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to={"registration"}>
            <PrimaryButton
              className={cn(
                "mt-100 md:mt-120 mb-200 px-140 md:px-160 py-20 h-180 md:h-300 rounded-[12rem] md:rounded-[18rem] font-black text-[16rem] md:text-[40rem] ",
                {
                  "md:mt-420": currentLanguage === "en",
                }
              )}
            >
              {t("greatest_show_25.buttons.register_now")}
            </PrimaryButton>
          </Link>
        </>
      )}
    </div>
  );
};
