import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";
import Marquee from "react-fast-marquee";

export type SpringSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const SpringSection: FC<SpringSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  return (
    <div className={cn(className)}>
      <img
        src={
          event.variables?.[`spring_in_my_hands_top_${currentLanguage}`].value
        }
        className="w-full"
        alt="image top"
      />
      <Marquee>
        <img
          src={event.variables?.spring_in_my_hands_image?.value}
          className="h-[80rem] md:h-[300rem]"
          alt="image"
        />
      </Marquee>
    </div>
  );
};
