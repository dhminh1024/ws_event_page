import { HTMLAttributes, useEffect, useRef, useState, type FC } from "react";
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
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/carousel";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/button";
export type PhotosSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const PhotosSection: FC<PhotosSectionProps> = ({
  className,
  ...props
}) => {
  const { ref: myRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    console.log(api.scrollSnapList().length);

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);


  return (
    <section
      ref={myRef}
      className={cn("text-center py-40", className)}
      {...props}
    >
      <div className="w-[80%] m-auto">
        <Carousel setApi={setApi} className="relative">
          <CarouselContent>
            {Array.from({
              length: Number(event?.variables.photos_number?.value) || 0,
            }).map((_, index) => (
              <CarouselItem className="basis-full" key={index}>
                <img
                  className="w-full h-auto"
                  src={String(
                    event?.variables[`photo_item_${index + 1}`]?.value ?? ""
                  )}
                  alt=""
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="h-full w-[20%] rounded-none opacity-0! cursor-pointer" />
          <CarouselNext className="h-full w-[20%] rounded-none opacity-0! cursor-pointer" />
        </Carousel>
        <div className="flex gap-x-40 md:gap-x-80 justify-center my-70 md:my-160">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              onClick={() => {
                api?.scrollTo(index);
              }}
              className={cn(
                "w-40 h-40 md:w-100 md:h-100 rounded-full bg-gs25-secondary cursor-pointer",
                {
                  "bg-gs25-primary": current === index + 1,
                }
              )}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <Link to="registration">
          <PrimaryButton className="mt-100 md:mt-120 mb-200 px-140 md:px-160 py-20 h-180 md:h-300 rounded-[12rem] md:rounded-[18rem] font-black text-[16rem] md:text-[40rem] ">
            {t("greatest_show_25.buttons.register_now")}
          </PrimaryButton>
        </Link>
      </div>
    </section>
  );
};
