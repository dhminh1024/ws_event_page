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

export type RouteSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const RouteSection: FC<RouteSectionProps> = ({ className }) => {
  const { t } = useLocales();
  const events = useEventPageContext();
  const headingRef = useRef(null);
  const borderRef = useRef(null);
  const routeGraphicRef = useRef(null);
  const paragraph1Ref = useRef(null);
  const paragraph2Ref = useRef(null);
  const paragraph3Ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // Heading
      animateZoomInOut(headingRef.current, {
        start: "top 100%",
        end: "bottom center",
      });
      // Border
      animateZoomInOut(borderRef.current, {
        start: "top 120%",
        end: "bottom 80%",
      });
      activeDashedRectSVG(borderRef.current);
      // Route Graphic
      animateFadeIn(routeGraphicRef.current, {
        start: "top 100%",
        end: "bottom center",
      });
      // Paragraph
      animateFadeInBottom(paragraph1Ref.current);
      animateFadeInBottom(paragraph2Ref.current);
      animateFadeInBottom(paragraph3Ref.current);
    }, 200);
  }, []);

  return (
    <div
      className={cn(
        "bg-hr-lime border-t-[#333] border-t-[8rem] pt-[60rem]",
        className
      )}
    >
      <div className="w-[90%] mx-auto">
        <SectionHeading
          ref={headingRef}
          className="text-[30rem] italic font-extrabold mb-[50rem]"
        >
          {t("happy_run.route_heading")}
        </SectionHeading>

        {/* <BorderWrapper className=""> */}
        <div className="relative w-full">
          <SVGCustomRectangle
            ref={borderRef}
            className="absolute top-0 left-0 w-full h-full"
          />
          <div className="flex h-full p-[60rem] gap-x-[10%]">
            <div className="basis-[45%]">
              <div
                ref={routeGraphicRef}
                className="w-[100%] h-[100%] bg-hr-ember"
              ></div>
            </div>
            <div className="basis-[55%] flex flex-col gap-y-[20rem]">
              <div ref={paragraph1Ref}>
                <Typography.Heading className="text-[25rem] mb-[20rem] text-hr-ember/80 font-extrabold uppercase">
                  {t("happy_run.detailed_route_heading")}
                </Typography.Heading>
                <Typography.Paragraph className="text-[18rem] text-hr-blue font-semibold">
                  {parser(
                    events.variables.detailed_route_conent_vn?.value || ""
                  )}
                </Typography.Paragraph>
              </div>
              <div ref={paragraph2Ref}>
                <Typography.Heading className="text-[25rem] mb-[20rem] text-hr-ember/80 font-extrabold uppercase">
                  {t("happy_run.timing_route_heading")}
                </Typography.Heading>
                <Typography.Paragraph className="text-[18rem] text-hr-blue font-semibold">
                  {parser(
                    events.variables.timing_route_content_vn?.value || ""
                  )}
                </Typography.Paragraph>
              </div>
              <div ref={paragraph3Ref}>
                <Typography.Heading className="text-[25rem] mb-[20rem] text-brand-persian font-extrabold uppercase">
                  {t("happy_run.highlight_route_heading")}
                </Typography.Heading>
                <Typography.Paragraph className="text-[18rem] italic text-brand-persian font-semibold">
                  {parser(
                    events.variables.highlight_route_content_vn?.value || ""
                  )}
                </Typography.Paragraph>
              </div>
            </div>
          </div>
        </div>
        {/* </BorderWrapper> */}
      </div>
    </div>
  );
};
