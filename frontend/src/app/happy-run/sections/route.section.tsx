import { HTMLAttributes, useEffect, useRef, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SectionHeading } from "../components/section-heading";
import { useLocales } from "@/core/hooks/use-locales";
import parser from "html-react-parser";
import {
  animateFadeInBottom,
  animateZoomInOut,
} from "../components/animate";
import Typography from "@/app/happy-box/components/typography";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import BorderWrapper from "../components/border-wrapper";
import RouteMapGIF from "@happy-run/assets/images/route-map.webp";
import { useResponsive } from "@/core/hooks/use-reponsive";

export type RouteSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const RouteSection: FC<RouteSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const events = useEventPageContext();
  const headingRef = useRef(null);
  const routeGraphicRef = useRef(null);
  const paragraph1Ref = useRef(null);
  const paragraph2Ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      animateZoomInOut(headingRef.current, {
        start: "top 100%",
        end: "bottom center",
      });
      animateZoomInOut(routeGraphicRef.current, {
        scrub: false,
      });
      animateFadeInBottom(paragraph1Ref.current, {
        start: "top 130%",
        end: "bottom center",
      });
      animateFadeInBottom(paragraph2Ref.current, {
        start: "top 130%",
        end: "bottom center",
      });
    }, 200);
  }, []);

  return (
    <div
      className={cn(
        "bg-hr-lime border-t-[#333] border-t-[8rem] pt-80 md:pt-240",
        className
      )}
    >
      <div className="w-[90%] mx-auto">
        <SectionHeading
          ref={headingRef}
          className="text-[10rem] md:text-[30rem] py-12 md:py-32 px-140 md:px-400 italic font-extrabold mb-80 md:mb-200"
        >
          {t("happy_run.route_heading")}
        </SectionHeading>

        <BorderWrapper
          dashedArray={isDesktop ? 25 : 20}
          strokeWidth={isDesktop ? 4 : 2}
          widthOffset={isDesktop ? 0.5 : 2}
          className="relative w-full py-80 md:py-40"
        >
          <div className="flex flex-col md:flex-row h-full p-80 md:p-240 gap-80">
            <div className="md:basis-[50%] flex justify-center items-center">
              <img
                ref={routeGraphicRef}
                src={RouteMapGIF}
                className="bg-hr-lime"
                alt="Route map"
              />
            </div>
            <div className="md:basis-[50%] flex flex-col gap-y-40 md:gap-y-80">
              <div ref={paragraph1Ref}>
                <Typography.Heading className="text-[13rem] md:text-[25rem] mb-20 md:mb-80 text-hr-ember/80 font-extrabold uppercase">
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
                <Typography.Heading className="text-[13rem] md:text-[25rem] mb-20 md:mb-80 text-hr-ember/80 font-extrabold uppercase">
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
            </div>
          </div>
        </BorderWrapper>
      </div>
    </div>
  );
};
