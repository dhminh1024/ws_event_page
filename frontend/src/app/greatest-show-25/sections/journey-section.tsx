import { HTMLAttributes, useEffect, useMemo, useRef, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import Typography from "..//components/typography";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import JourneyRoadImage from "../assets/images/journey-road.png";
import Round1Image from "../assets/images/journey-round-1.png";
import Round2Image from "../assets/images/journey-round-2.png";
import Round3Image from "../assets/images/journey-round-3.png";
import {
  animateFadeInBottom,
  animateFadeInLeft,
  animateFadeInRight,
  animateZoomInOut,
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
import { is } from "date-fns/locale";
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

  const milestones = useMemo(
    () => [
      {
        title:
          currentLanguage === "vn"
            ? event.variables.journey_item_1_title_vn?.value || ""
            : event.variables.journey_item_1_title_en?.value || "",
        desc:
          currentLanguage === "vn"
            ? event.variables.journey_item_1_desc_vn?.value || ""
            : event.variables.journey_item_1_desc_en?.value || "",
        img: Round1Image,
        linkRules: "/round-detail/within-me",
        linkResults: "#",
        style: {
          marginTop: !isDesktop ? "-90rem" : "0",
          top: "16%",
          right: "5%",
          width: isDesktop ? "55%" : "100%",
        },
        titleStyle: {
          paddingLeft: !isDesktop ? "45%" : "0",
        },
        buttonGroupStyle: {
          justifyContent: !isDesktop ? "flex-end" : "flex-start",
        },
      },
      {
        title:
          currentLanguage === "vn"
            ? event.variables.journey_item_2_title_vn?.value || ""
            : event.variables.journey_item_2_title_en?.value || "",
        desc:
          currentLanguage === "vn"
            ? event.variables.journey_item_2_desc_vn?.value || ""
            : event.variables.journey_item_2_desc_en?.value || "",
        img: Round2Image,
        linkRules: "/round-detail/where-am-i",
        linkResults: "#",
        style: {
          marginTop: !isDesktop ? "-55rem" : "0",
          top: "45%",
          left: "10%",
          width: isDesktop ? "55%" : "100%",
        },
        titleStyle: {
          paddingLeft: !isDesktop ? "8%" : "0",
          paddingRight: !isDesktop ? "40%" : "0",
        },
      },
      {
        title:
          currentLanguage === "vn"
            ? event.variables.journey_item_3_title_vn?.value || ""
            : event.variables.journey_item_3_title_en?.value || "",
        desc:
          currentLanguage === "vn"
            ? event.variables.journey_item_3_desc_vn?.value || ""
            : event.variables.journey_item_3_desc_en?.value || "",
        img: Round3Image,
        linkRules: "/round-detail/here-i-am",
        linkResults: "#",
        style: {
          marginTop: !isDesktop ? "-25rem" : "0",
          top: "78%",
          right: "5%",
          width: isDesktop ? "55%" : "100%",
        },
        titleStyle: {
          paddingLeft: !isDesktop ? "8%" : "0",
          paddingRight: !isDesktop ? "20%" : "0",
        },
      },
    ],
    [currentLanguage, isDesktop]
  );

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
    }, 200);
  }, [inView]);

  return (
    <div id="journey" ref={myRef} className={cn("text-center py-40", className)} {...props}>
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
              {milestones.map((item, index) => (
                <div className="" key={index}>
                  {!isDesktop ? (
                    <img
                      src={item.img}
                      alt="Journey Road"
                      className="w-full mb-40"
                    />
                  ) : null}
                  <div
                    key={index}
                    className="w-full md:absolute text-left"
                    style={item.style}
                  >
                    <Typography.Heading
                      className="text-gs25-primary md:leading-180! mb-70 md:mb-100 font-extrabold leading-90! text-[17rem] md:text-[36rem] "
                      style={item.titleStyle}
                    >
                      {parser(item.title)}
                    </Typography.Heading>
                    <Typography.Paragraph className="text-gs25-secondary px-140 md:px-0 leading-70! md:leading-130! text-[11rem] md:text-[20rem]">
                      {parser(item.desc)}
                    </Typography.Paragraph>
                    <div
                      className="flex gap-x-40 md:gap-x-80 mt-60 px-140 md:px-0"
                      style={item.buttonGroupStyle}
                    >
                      <Link to={item.linkResults}>
                        <SecondaryButton className="text-white px-60 md:px-120 py-20 md:h-140 md:rounded-[8rem] italic text-[11rem] md:text-[18rem]">
                          {t("greatest_show_25.buttons.entry_rules")}
                        </SecondaryButton>
                      </Link>
                      <Link to={item.linkResults}>
                        <ThirdaryButton className="text-white px-60 md:px-120 py-20 md:h-140 md:rounded-[8rem] italic text-[11rem] md:text-[18rem]">
                          {t("greatest_show_25.buttons.entry_results")}
                        </ThirdaryButton>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link to={"#"}>
            <PrimaryButton className="mt-100 md:mt-120 mb-200 px-140 md:px-160 py-20 h-180 md:h-300 rounded-[12rem] md:rounded-[18rem] font-black text-[16rem] md:text-[40rem] ">
              {t("greatest_show_25.buttons.register_now")}
            </PrimaryButton>
          </Link>
        </>
      )}
    </div>
  );
};
