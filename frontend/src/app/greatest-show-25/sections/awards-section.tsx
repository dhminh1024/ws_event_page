import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
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
  animateWavebeat,
} from "../components/animate";
import { useInView } from "react-intersection-observer";
import BlockIcon1 from "@greatest-show-25/assets/images/award-item-1.png";
import BlockIcon2 from "@greatest-show-25/assets/images/award-item-2.png";
import BlockIcon3 from "@greatest-show-25/assets/images/award-item-3.png";
import BlockIcon4 from "@greatest-show-25/assets/images/award-item-4.png";
import BlockIcon5 from "@greatest-show-25/assets/images/award-item-5.png";
import BackgroundImage from "@greatest-show-25/assets/images/awards-section-bg.png";
import BackgroundImageMobile from "@greatest-show-25/assets/images/awards-section-bg-mb.png";
import AwardValueImage from "@greatest-show-25/assets/images/award-value.png";
import { useResponsive } from "@/core/hooks/use-reponsive";

export type AwardsSectionProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {};

export const AwardsSection = forwardRef<HTMLDivElement, AwardsSectionProps>(
  ({ className, children, ...props }, ref) => {
    const { isDesktop } = useResponsive();
    const { ref: myRef, inView } = useInView({
      triggerOnce: true,
      rootMargin: "300px",
    });

    const { t, currentLanguage } = useLocales();
    // const { isDesktop } = useResponsive();
    const event = useEventPageContext();
    const headingRef = useRef<HTMLImageElement>(null);
    const moneyRef = useRef<HTMLImageElement>(null);
    const award1Ref = useRef<HTMLDivElement>(null);
    const award2Ref = useRef<HTMLDivElement>(null);
    const award3Ref = useRef<HTMLDivElement>(null);
    const award4Ref = useRef<HTMLDivElement>(null);
    const award5Ref = useRef<HTMLDivElement>(null);

    const awards = useMemo(
      () => [
        {
          title: t("greatest_show_25.category_item_1"),
          img: BlockIcon1,
          ref: award1Ref,
        },
        {
          title: t("greatest_show_25.category_item_2"),
          img: BlockIcon2,
          ref: award2Ref,
        },
        {
          title: t("greatest_show_25.category_item_3"),
          img: BlockIcon3,
          ref: award3Ref,
        },
        {
          title: t("greatest_show_25.category_item_4"),
          img: BlockIcon4,
          ref: award4Ref,
        },
        {
          title: t("greatest_show_25.category_item_5"),
          img: BlockIcon5,
          ref: award5Ref,
        },
      ],
      [currentLanguage]
    );

    useEffect(() => {
      if (!inView) return;
      setTimeout(() => {
        animateZoomInOut(headingRef?.current);
        animateWavebeat(moneyRef?.current, {
          scale: 1.04,
          rotation: 2,
          duration: 2,
          delay: 0.5,
          yoyo: true,
        });
        awards.forEach((award, index) => {
          animateFadeInBottom(award.ref.current, {
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          });
        });
      }, 200);
    }, [inView]);

    return (
      <section
        ref={myRef}
        className={cn("overflow-hidden", className)}
        style={{
          // backgroundColor: "var(--color-gs25-primary)",
          backgroundImage: `url(${
            isDesktop ? BackgroundImage : BackgroundImageMobile
          })`,
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
        }}
        {...props}
      >
        <div className="w-[90%] mx-auto py-80 pt-[40%] pb-[40%] md:pt-[40%] md:pb-[43%]">
          <div id="awards">
            <Typography.Heading
              ref={headingRef}
              className="text-center font-ethnocentric bg-gs25-gradient-5 bg-clip-text text-transparent text-[20rem] md:text-[65rem] uppercase font-normal"
            >
              {t("greatest_show_25.awards_heading")}
            </Typography.Heading>
            <Typography.Paragraph className="mt-40 md:mt-80 text-center text-[16rem] md:text-[24rem] text-white max-w-[800rem] mx-auto">
              {t("greatest_show_25.awards_value_title")}
            </Typography.Paragraph>
            <img
              className="w-[90%] mx-auto"
              src={AwardValueImage}
              ref={moneyRef}
              alt="Award Value Image"
            />
            <div className="flex flex-wrap flex-col md:flex-row justify-center gap-x-200 gap-y-60 md:gap-y-100 mx-auto">
              {awards.map((award, index) => (
                <div
                  ref={award.ref}
                  className="relative w-[70%] mx-auto md:w-[40%]"
                  key={index}
                >
                  <img src={award.img} alt={award.title} />
                  <div className="flex flex-col absolute w-full pl-140 md:px-280 left-0 bottom-[2%] md:bottom-[5%] items-start mt-20">
                    <Typography.Paragraph className="mb-10 text-[11rem] md:text-[20rem] text-center text-white">
                      {parser(
                        t(
                          "greatest_show_25.award_item_" +
                            (index + 1) +
                            "_value"
                        )
                      )}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="text-[11rem] md:text-[20rem] text-center text-white">
                      {t("greatest_show_25.award_item_bonus")}
                    </Typography.Paragraph>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
