import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SectionHeading } from "../components/section-heading";
import { useLocales } from "@/core/hooks/use-locales";
import Typography from "@/app/happy-box/components/typography";
import parser from "html-react-parser";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import {
  animateBounceUp,
  animateFadeInBottom,
  animateZoomInBounce,
  animateZoomInOut,
  drawLineSVG,
} from "../components/animate";
import { useInView } from "react-intersection-observer";
import BlockIcon1 from "@greatest-show-25/assets/images/singing-icon.png";
import BlockIcon2 from "@greatest-show-25/assets/images/dancing-icon.png";
import BlockIcon3 from "@greatest-show-25/assets/images/intrusment-icon.png";
import BlockIcon4 from "@greatest-show-25/assets/images/free-icon.png";
import CategoryCardImage from "../assets/images/category-card.png";
import { useResponsive } from "@/core/hooks/use-reponsive";
export type EntryCategoriesSectionProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {};

export const EntryCategoriesSection = forwardRef<
  HTMLDivElement,
  EntryCategoriesSectionProps
>(({ className, children, ...props }, ref) => {
  const { ref: myRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });
  const [showCard, setShowCard] = useState<number | null>(null);

  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();

  const event = useEventPageContext();
  const kitTitleRef = useRef<HTMLImageElement>(null);
  const kitDescRef = useRef<HTMLDivElement>(null);
  const kitCurlyArrowRef = useRef<SVGSVGElement>(null);
  const kitItem1Ref = useRef<HTMLDivElement>(null);
  const kitItem2Ref = useRef<HTMLDivElement>(null);
  const kitItem3Ref = useRef<HTMLDivElement>(null);
  const kitItem4Ref = useRef<HTMLDivElement>(null);
  const kitItem5Ref = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => [
      {
        title: t("greatest_show_25.category_item_1"),
        img: BlockIcon1,
        cardTitle:
          event?.variables?.[`category_item_1_title_${currentLanguage}`]
            ?.value || "",
        cardDesc:
          event?.variables?.[`category_item_1_desc_${currentLanguage}`]
            ?.value || "",
      },
      {
        title: t("greatest_show_25.category_item_2"),
        img: BlockIcon2,
        cardTitle:
          event?.variables?.[`category_item_2_title_${currentLanguage}`]
            ?.value || "",
        cardDesc:
          event?.variables?.[`category_item_2_desc_${currentLanguage}`]
            ?.value || "",
      },
      {
        title: t("greatest_show_25.category_item_3"),
        img: BlockIcon3,
        cardTitle:
          event?.variables?.[`category_item_3_title_${currentLanguage}`]
            ?.value || "",
        cardDesc:
          event?.variables?.[`category_item_3_desc_${currentLanguage}`]
            ?.value || "",
      },
      {
        title: t("greatest_show_25.category_item_4"),
        img: BlockIcon4,
        cardTitle:
          event?.variables?.[`category_item_4_title_${currentLanguage}`]
            ?.value || "",
        cardDesc:
          event?.variables?.[`category_item_4_desc_${currentLanguage}`]
            ?.value || "",
      },
    ],
    [currentLanguage]
  );

  const toggleCard = (index: number) => {
    if (showCard === index) {
      setShowCard(null);
    } else {
      setShowCard(index);
    }
  };

  useEffect(() => {
    if (!inView) return;
    setTimeout(() => {
      animateZoomInOut(kitTitleRef?.current);

      drawLineSVG(
        kitCurlyArrowRef?.current,
        kitCurlyArrowRef?.current?.querySelector("path#line"),
        { start: "top 100%", end: "top 40%" }
      );
      drawLineSVG(
        kitCurlyArrowRef?.current,
        kitCurlyArrowRef?.current?.querySelector("path#arrow"),
        { start: "top 40%", end: "top 0%" }
      );

      // if (!isDesktop) return;
      animateFadeInBottom(kitDescRef?.current, {
        start: "top 100%",
        end: "top center",
      });
      animateFadeInBottom(kitItem1Ref?.current, {
        start: "top 100%",
        end: "top center",
      });
      animateFadeInBottom(kitItem2Ref?.current, {
        start: "top 100%",
        end: "top center",
      });
      animateFadeInBottom(kitItem3Ref?.current, {
        start: "top 100%",
        end: "top center",
      });
      animateFadeInBottom(kitItem4Ref?.current, {
        start: "top 100%",
        end: "top center",
      });
      animateFadeInBottom(kitItem5Ref?.current, {
        start: "top 100%",
        end: "top center",
      });
    }, 200);
  }, [inView]);

  return (
    <section ref={myRef} className={cn("overflow-hidden", className)}>
      <div className="w-[90%] mx-auto py-80 md:py-240">
        <SectionHeading
        //   ref={headingRef}
        >
          {t("greatest_show_25.category_heading")}
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-x-60 w-[90%] mx-auto">
          {categories.map((category, index) => (
            <div
              className="group relative cursor-pointer"
              key={index}
              onClick={() => !isDesktop && toggleCard(index)}
            >
              <div
                className={cn(
                  "group-hover:scale-0 transition-transform duration-300",
                  {
                    "scale-0": showCard === index,
                  }
                )}
              >
                <img src={category.img} alt={category.title} />
                <Typography.Heading className="-mt-100 md:-mt-160 text-[16rem] md:text-[26rem] font-extrabold uppercase text-center text-gs25-primary">
                  {category.title}
                </Typography.Heading>
              </div>
              <div
                className={cn(
                  "absolute top-[50%] left-[50%] translate-[-50%] m-auto w-[90%] md:w-[80%] h-auto group-hover:scale-100 group-visited:scale-100 group-focus:scale-100 scale-0 transition-transform duration-300",
                  {
                    "scale-100": showCard === index,
                  }
                )}
              >
                <img src={CategoryCardImage} alt="" />
                <div className="absolute top-0 left-0 text-center p-60 md:p-80 pt-100 md:pt-140 h-full flex flex-col">
                  <Typography.Heading className="text-[14rem] md:text-[26rem] font-extrabold uppercase text-center text-white mb-20 md:mb-40">
                    {category.cardTitle}
                  </Typography.Heading>
                  <div
                    className={cn(
                      "text-[10rem] flex flex-col gap-y-20 md:text-[18rem] text-white font-semibold  text-center",
                      {
                        "text-[11rem] md:text-[14rem]":
                          currentLanguage === "en",
                      }
                    )}
                  >
                    {parser(category.cardDesc)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
