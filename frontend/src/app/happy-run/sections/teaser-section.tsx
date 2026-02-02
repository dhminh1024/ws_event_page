import { HTMLAttributes, useEffect, useRef, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import Typography from "@happy-run/components/typography";
import parser from "html-react-parser";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

import {
  animateFadeInLeft,
  animateFadeInRight,
  animateZoomInOut,
} from "../components/animate";

export type TeaserSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const TeaserSection: FC<TeaserSectionProps> = ({
  className,
  ...props
}) => {
  const { t } = useLocales();
  const event = useEventPageContext();
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const textDescRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div
      className={cn("text-center py-40", className)}
      {...props}
    >
      <Typography.Heading
        level={2}
        className="pt-20 md:pt-160 mb-40 md:mb-120 font-race-champion text-hr-blue text-[25rem] md:text-[75rem] uppercase flex items-center justify-center"
      >
        <div ref={text1Ref}>{parser(t("happy_run.teaser_heading_1"))}</div>
        <div ref={text2Ref} className="text-hr-honey ml-20">
          {parser(t("happy_run.teaser_heading_2"))}
        </div>
      </Typography.Heading>
      {event.variables.teaser_embed_url?.value && (
        <iframe
          src={event.variables.teaser_embed_url?.value}
          className="mx-auto aspect-video w-[75%] md:h-auto"
        ></iframe>
      )}
    </div>
  );
};
