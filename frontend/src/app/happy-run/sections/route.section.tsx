import { HTMLAttributes, useEffect, useRef, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SectionHeading } from "../components/section-heading";
import { useLocales } from "@/core/hooks/use-locales";
import { SVGCustomRectangle, SVGRectangle } from "../components/svg";
import parser from "html-react-parser";
import {
  activeDashedRectSVG,
  animateFadeIn,
  animateFadeInBottom,
  animateFadeInRight,
  animateZoomInOut,
} from "../components/animate";
import Typography from "@/app/happy-box/components/typography";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import BorderWrapper from "../components/border-wrapper";
import RouteMapGIF from "@happy-run/assets/images/route-map.gif";
import { useResponsive } from "@/core/hooks/use-reponsive";

export type RouteSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const RouteSection: FC<RouteSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const {isDesktop} = useResponsive();
  const events = useEventPageContext();
  const headingRef = useRef(null);
  const borderRef = useRef(null);
  const routeGraphicRef = useRef(null);
  const paragraph1Ref = useRef(null);
  const paragraph2Ref = useRef(null);
  // const paragraph3Ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // Heading
      animateZoomInOut(headingRef.current, {
        start: "top 100%",
        end: "bottom center",
      });
      // Border
      // animateZoomInOut(borderRef.current, {
      //   start: "top 120%",
      //   end: "bottom 80%",
      // });
      // activeDashedRectSVG(borderRef.current);
      // Route Graphic
      animateZoomInOut(routeGraphicRef.current, {
        scrub: false,
      });
      // Paragraph
      animateFadeInBottom(paragraph1Ref.current,{start: "top 130%", end: "bottom center"});
      animateFadeInBottom(paragraph2Ref.current,{start: "top 130%", end: "bottom center"});
      // animateFadeInBottom(paragraph3Ref.current,{start: "top 130%", end: "bottom center"});
    }, 200);
  }, []);

  return (
    <div
      className={cn(
        "bg-hr-lime border-t-[#333] border-t-[8rem] pt-[20rem] md:pt-[60rem]",
        className
      )}
    >
      <div className="w-[90%] mx-auto">
        <SectionHeading
          ref={headingRef}
          className="text-[10rem] md:text-[30rem] py-[3rem] md:py-[8rem] px-[35rem] md:px-[100rem] italic font-extrabold mb-[20rem] md:mb-[50rem]"
        >
          {t("happy_run.route_heading")}
        </SectionHeading>

        {/* <BorderWrapper className=""> */}
        <BorderWrapper
          dashedArray={isDesktop ? 25: 20}
          strokeWidth={isDesktop ? 4 : 2}
          widthOffset={isDesktop ? 0.5 : 2}
          className="relative w-full py-[20rem] md:py-[10rem]"
        >
          {/* <SVGCustomRectangle
            ref={borderRef}
            className="absolute top-0 left-0 w-full h-full"
          /> */}
          <div className="flex flex-col md:flex-row h-full p-[20rem] md:p-[60rem] gap-[20rem]">
            <div className="md:basis-[50%] flex justify-center items-center">
              <img ref={routeGraphicRef} src={RouteMapGIF} className="bg-hr-lime" alt="Route map" />
            </div>
            <div className="md:basis-[50%] flex flex-col gap-y-[10rem] md:gap-y-[20rem]">
              <div ref={paragraph1Ref}>
                <Typography.Heading className="text-[13rem] md:text-[25rem] mb-[5rem] md:mb-[20rem] text-hr-ember/80 font-extrabold uppercase">
                  {t("happy_run.detailed_route_heading")}
                </Typography.Heading>
                <Typography.Paragraph className="text-[9rem] md:text-[18rem] text-hr-blue font-semibold">
                  {parser(
                    events.variables?.[
                      currentLanguage === "en"
                        ? "detailed_route_content_en"
                        : "detailed_route_content_vn"
                    ]?.value || ""
                  )}
                </Typography.Paragraph>
              </div>
              <div ref={paragraph2Ref}>
                <Typography.Heading className="text-[13rem] md:text-[25rem] mb-[5rem] md:mb-[20rem] text-hr-ember/80 font-extrabold uppercase">
                  {t("happy_run.timing_route_heading")}
                </Typography.Heading>
                <Typography.Paragraph className="text-[9rem] md:text-[18rem] text-hr-blue font-semibold">
                  {parser(
                    events.variables?.[
                      currentLanguage === "en"
                        ? "timing_route_content_en"
                        : "timing_route_content_vn"
                    ]?.value || ""
                  )}
                </Typography.Paragraph>
              </div>
              {/* <div ref={paragraph3Ref}>
                <Typography.Heading className="text-[13rem] md:text-[25rem] mb-[5rem] md:mb-[20rem] text-brand-persian font-extrabold uppercase">
                  {t("happy_run.highlight_route_heading")}
                </Typography.Heading>
                <Typography.Paragraph className="text-[9rem] md:text-[18rem] italic text-brand-persian font-semibold">
                  {parser(
                    events.variables?.[
                      currentLanguage === "en"
                        ? "highlight_route_content_en"
                        : "highlight_route_content_vn"
                    ]?.value || ""
                  )}
                </Typography.Paragraph>
              </div> */}
            </div>
          </div>
        </BorderWrapper>
        {/* </BorderWrapper> */}
      </div>
    </div>
  );
};
