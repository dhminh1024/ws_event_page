import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { HTMLAttributes, type FC } from "react";

export type HeroSectionProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const HeroSection: FC<HeroSectionProps> = ({ className,...props }) => {
  const event = useEventPageContext();

  return (
    <div className="relative w-full bg-hr-blue overflow-hidden" {...props}>
      <video className="relative z-20 w-full" src={event.variables.hero_kv?.value} autoPlay muted loop/>
      <img className="w-full absolute top-0 left-0 z-5" src={event.variables.hero_image?.value} alt="hero" />
    </div>
  );
};
