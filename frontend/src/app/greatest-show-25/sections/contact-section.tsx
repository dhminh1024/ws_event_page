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

export type ContactSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const ContactSection: FC<ContactSectionProps> = ({
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
    // setTimeout(() => {
    //   animateFadeInLeft(text1Ref.current, {
    //     start: "top 100%",
    //     end: "top 50%",
    //   });
    //   animateFadeInRight(text2Ref.current, {
    //     start: "top 100%",
    //     end: "top 50%",
    //   });
    //   animateZoomInOut(textDescRef.current, {
    //     start: "top 100%",
    //     end: "top 50%",
    //   });
    // }, 200);
  }, [inView]);

  return (
    <div
      id={"contact"}
      ref={myRef}
      className={cn("text-center py-40 bg-gs25-gradient-8", className)}
      {...props}
    >
      <div className="w-[80%] mx-auto py-40">
        <Typography.Heading
          level={2}
          className="text-white text-[13rem] md:text-[26rem]"
        >
          {t("greatest_show_25.contact_section_heading")}
        </Typography.Heading>
        <Typography.Paragraph className="text-white text-[12rem] md:text-[30rem] font-bold leading-[180%] md:leading-[200%]">
          {t("greatest_show_25.contact_email", {
            email: event.variables?.contact_email?.value,
          })}
        </Typography.Paragraph>
      </div>
    </div>
  );
};
