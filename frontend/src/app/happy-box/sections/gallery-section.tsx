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
      <BackgroundCloud className="py-[15rem] md:py-[40rem]">
        <GreekPattern className="h-[15rem] md:h-[25rem]"></GreekPattern>
      </BackgroundCloud>
      <Marquee className="bg-happy_box-light_yellow">
        <div className="flex">
          {gallery?.map((submission, index) => (
            <div className="h-[120rem] md:h-[300rem] aspect-[4/3]">
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
      <BackgroundCloud className="py-[15rem] md:py-[40rem]">
        <GreekPattern className="h-[15rem] md:h-[25rem]"></GreekPattern>
      </BackgroundCloud>
    </div>
  );
};
