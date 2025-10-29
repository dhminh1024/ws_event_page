import { HTMLAttributes, useEffect, useRef, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import Typography from "@happy-run/components/typography";
import parser from "html-react-parser";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

import {
  animateFadeInBottom,
  animateFadeInLeft,
  animateFadeInRight,
  animateZoomInOut,
} from "../components/animate";
import { useInView } from "react-intersection-observer";

export type TeaserSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const TeaserSection: FC<TeaserSectionProps> = ({
  className,
  ...props
}) => {
  const { ref: myRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const textDescRef = useRef(null);

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
    <section
      ref={myRef}
      className={cn("text-center py-40", className)}
      {...props}
    >
      <>
        <h2
          ref={textDescRef}
          className="pt-20 md:pt-160 mb-40 md:mb-120 font-ethnocentric bg-gs25-gradient-4 bg-clip-text text-transparent text-[20rem] md:text-[55rem] uppercase font-normal
             flex items-center justify-center"
        >
          GREATEST SHOW 2025
        </h2>
        <div className="w-[80%] mx-auto">
          <Typography.Heading
            level={2}
            className="text-gs25-secondary flex flex-col  gap-y-40 md:gap-y-120 text-[10.2rem] md:text-[20rem] mb-20 md:mb-80 "
          >
            {parser(
              event.variables?.[
                currentLanguage === "en" ? "teaser_meta_en" : "teaser_meta_vn"
              ]?.value || ""
            )}
          </Typography.Heading>
        </div>
        {event.variables.teaser_embed_url?.value && (
          <iframe
            src={event.variables.teaser_embed_url?.value}
            className="mx-auto aspect-video w-[80%] md:w-[50%] mt-70 md:mt-280 md:h-auto"
          ></iframe>
        )}
      </>
    </section>
  );
};
