import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";
import Marquee from "react-fast-marquee";
import { useInView } from "react-intersection-observer";

export type SpringSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const SpringSection: FC<SpringSectionProps> = ({ className }) => {
  const { ref: myRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  return (
    <section ref={myRef} className={cn(className)}>
      {inView && (
        <>
          <img
            src={
              event.variables?.[`spring_in_my_hands_top_${currentLanguage}`]
                ?.value
            }
            className="w-full"
            alt="image top"
          />
          <Marquee>
            <img
              src={event.variables?.spring_in_my_hands_image?.value}
              className="h-[180rem] md:h-[300rem]"
              alt="image"
            />
          </Marquee>
        </>
      )}
    </section>
  );
};
