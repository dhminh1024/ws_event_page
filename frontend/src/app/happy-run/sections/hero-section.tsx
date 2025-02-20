import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { HTMLAttributes, type FC } from "react";

export type HeroSectionProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const HeroSection: FC<HeroSectionProps> = ({ className,...props }) => {
  const event = useEventPageContext();

  return (
    <div className="w-full" {...props}>
      <img className="w-full" src={event.variables.hero_image?.value} alt="hero" />
    </div>
  );
};
