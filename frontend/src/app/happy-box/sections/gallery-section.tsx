import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { BackgroundCloud, GreekPattern } from "@happy-box/components/background";
import Marquee from "react-fast-marquee";

export type GallerySectionProps = HTMLAttributes<HTMLDivElement> & {};

export const GallerySection: FC<GallerySectionProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <BackgroundCloud className="py-[40rem]">
        <GreekPattern className="h-[25rem]"></GreekPattern>
      </BackgroundCloud>
      <Marquee>
        <div className="flex">
          {[...Array(10)].map((_, index) => (
            <img
              key={index}
              src="https://via.placeholder.com/300"
              alt="placeholder"
            />
          ))}
        </div>
      </Marquee>
      <BackgroundCloud className="py-[40rem]">
        <GreekPattern className="h-[25rem]"></GreekPattern>
      </BackgroundCloud>
    </div>
  );
};
