import { HTMLAttributes, use, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import {
  BackgroundCloud,
  GreekPattern,
} from "@happy-box/components/background";
import Marquee from "react-fast-marquee";
import useGetGallery from "@/api/happy-box/use-get-gallery";

export type GallerySectionProps = HTMLAttributes<HTMLDivElement> & {};

export const GallerySection: FC<GallerySectionProps> = ({ className }) => {
  const { gallery } = useGetGallery();
  return (
    <div className={cn(className)}>
      <BackgroundCloud className="py-60 md:py-160">
        <GreekPattern className="h-60 md:h-100"></GreekPattern>
      </BackgroundCloud>
      <Marquee className="bg-happy_box-light_yellow" speed={150}>
        <div className="flex">
          {gallery?.map((submission, index) => (
            <div key={submission.name} className="h-480 md:h-1200 aspect-4/3">
              <img
                className="object-cover w-full h-full"
                key={index}
                src={submission.image}
                alt="placeholder"
              />
            </div>
          ))}
        </div>
      </Marquee>
      <BackgroundCloud className="py-60 md:py-160">
        <GreekPattern className="h-60 md:h-100"></GreekPattern>
      </BackgroundCloud>
    </div>
  );
};
