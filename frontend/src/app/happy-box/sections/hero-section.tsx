import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { type FC } from "react";

export type HeroSectionProps = {
  className?: string;
};

export const HeroSection: FC<HeroSectionProps> = ({ className }) => {
  const event = useEventPageContext();

  return (
    <div>
      <img src={event.variables.hero_image.value} alt="hero" />
    </div>
  );
};
