import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SectionHeading } from "../components/section-heading";
import { useLocales } from "@/core/hooks/use-locales";
import KitTitleVN from "@happy-run/assets/images/kit-title-vn.webp";
import KitTitleEN from "@happy-run/assets/images/kit-title-en.webp";
import Typography from "@/app/happy-box/components/typography";
import parser from "html-react-parser";
import { SVGCurlyArrow, SVGCustomRectangle } from "../components/svg";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

import { DimondBlock } from "../components/dimond-block";
import { ItemModal } from "../components/item-modal";
import KitBackground from "@happy-run/assets/images/kit-background.webp";
import { X } from "lucide-react";

import {
  animateBounceUp,
  animateFadeInBottom,
  animateZoomInBounce,
  animateZoomInOut,
  drawLineSVG,
} from "../components/animate";
import { useResponsive } from "@/core/hooks/use-reponsive";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { log } from "console";

export type KitSectionProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {};

export const KitSection = forwardRef<HTMLDivElement, KitSectionProps>(
  ({ className, children, ...props }, ref) => {
    const { ref: myRef, inView } = useInView({
      triggerOnce: true,
      rootMargin: "300px",
    });

    const { t, currentLanguage } = useLocales();
    // const { isDesktop } = useResponsive();
    const event = useEventPageContext();
    const kitTitleRef = useRef<HTMLImageElement>(null);
    const kitDescRef = useRef<HTMLDivElement>(null);
    const kitCurlyArrowRef = useRef<SVGSVGElement>(null);
    const kitItem1Ref = useRef<HTMLDivElement>(null);
    const kitItem2Ref = useRef<HTMLDivElement>(null);
    const kitItem3Ref = useRef<HTMLDivElement>(null);
    const kitItem4Ref = useRef<HTMLDivElement>(null);
    const kitItem5Ref = useRef<HTMLDivElement>(null);


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
        {inView && (
          <div className="w-[90%] mx-auto py-[20rem] md:py-[60rem]">
            <SectionHeading
              //   ref={headingRef}
              className="text-[12rem] md:text-[25rem] p-[3rem_40rem] md:p-[10rem_70rem] italic font-extrabold mb-[50rem]"
            >
              {t("happy_run.kit_heading")}
            </SectionHeading>
            <center>
              <img
                ref={kitTitleRef}
                src={currentLanguage === "en" ? KitTitleEN : KitTitleVN}
                alt="kit"
                className="w-full md:w-[70%] mx-auto"
              />
              <div ref={kitDescRef} className="relative">
                <Typography.Paragraph className="text-center text-[9rem] md:text-[23rem] text-hr-blue font-extrabold mt-[5rem] md:mt-[40rem]">
                  {parser(t("happy_run.kit_description"))}
                </Typography.Paragraph>
                <Typography.Paragraph className="text-center text-[9rem] md:text-[23rem] text-hr-blue font-semibold">
                  {t("happy_run.kit_meta")}
                </Typography.Paragraph>
                <SVGCurlyArrow
                  ref={kitCurlyArrowRef}
                  className="absolute top-[120%] md:top-[60%] left-[0%] md:left-[9%] h-auto w-[50rem] md:w-[130rem]"
                />
              </div>
            </center>
            <div className="mt-[50rem] md:mt-[120rem] w-[100%] md:w-[80%] mx-auto">
              <div className="flex flex-wrap justify-center items-center gap-x-[15rem] md:gap-x-[120rem]">
                <ItemModal
                  className="max-w-[640rem] "
                  content={(close) => (
                    <div
                      className="relative p-[20rem] w-full"
                      style={{
                        backgroundImage: `url(${KitBackground})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img
                        className="w-[50%] md:w-[40%] mx-auto p-[20rem]"
                        src={event?.variables.item_bib?.value}
                        alt="ticket image"
                      />
                      <Typography.Heading className="text-[16rem] md:text-[28rem] text-center text-hr-blue font-extrabold uppercase">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_bib_title_en"
                              : "item_bib_title_vn"
                          ]?.value || ""
                        )}
                      </Typography.Heading>
                      <Typography.Text className="text-[10rem] md:text-[16rem] text-left text-hr-blue font-medium">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_bib_desc_en"
                              : "item_bib_desc_vn"
                          ]?.value || ""
                        )}
                      </Typography.Text>

                      <div
                        className="absolute top-[2%] right-[2%] cursor-pointer"
                        onClick={close}
                      >
                        <X className="w-[30rem] h-[30rem] text-hr-blue font-black" />
                      </div>
                    </div>
                  )}
                >
                  <div
                    ref={kitItem1Ref}
                    className="w-[35%] md:w-[25%] mx-[20rem] md:mx-[0rem] inline-block"
                  >
                    <DimondBlock className="w-full h-full rounded-[20rem] md:rounded-[40rem] pb-[100%]  shadow-[inset_0rem_0rem_20rem_10rem_#00000055] bg-gradient-to-tr bg-brand-persian from-brand-teal/40 to-brand-persian ">
                      <img
                        src={event?.variables.item_bib?.value}
                        className="absolute w-[65%] h-[75%] object-contain top-[0rem] left-0 right-0 bottom-0 m-auto "
                        alt="BIB"
                      />
                      <p className="text-[20rem]">Halow</p>
                    </DimondBlock>
                  </div>
                </ItemModal>
                <ItemModal
                  className="max-w-[640rem] "
                  content={(close) => (
                    <div
                      className="relative p-[20rem] w-full"
                      style={{
                        backgroundImage: `url(${KitBackground})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img
                        className="w-[50%] md:w-[40%] mx-auto p-[20rem]"
                        src={event?.variables.item_tshirt?.value}
                        alt="ticket image"
                      />
                      <Typography.Heading className="text-[16rem] md:text-[28rem] text-center text-hr-blue font-extrabold uppercase">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_tshirt_title_en"
                              : "item_tshirt_title_vn"
                          ]?.value || ""
                        )}
                      </Typography.Heading>
                      <Typography.Text className="text-[10rem] md:text-[16rem] text-left text-hr-blue font-medium">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_tshirt_desc_en"
                              : "item_tshirt_desc_vn"
                          ]?.value || ""
                        )}
                      </Typography.Text>
                      <img
                        className="w-full mx-auto py-[20rem]"
                        src={
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "tshirt_size_table_en"
                              : "tshirt_size_table_vn"
                          ]?.value
                        }
                        alt="ticket image"
                      />
                      <div
                        className="absolute top-[2%] right-[2%] cursor-pointer"
                        onClick={close}
                      >
                        <X className="w-[30rem] h-[30rem] text-hr-blue font-black" />
                      </div>
                    </div>
                  )}
                >
                  <div
                    ref={kitItem2Ref}
                    className="w-[35%] md:w-[25%] mx-[20rem] md:mx-[0rem] inline-block"
                  >
                    <DimondBlock className="rounded-[20rem] md:rounded-[40rem] pb-[100%]  shadow-[inset_0rem_0rem_20rem_10rem_#00000055] bg-gradient-to-tr from-brand-honey bg-black to-brand-lime/80">
                      <img
                        src={event?.variables.item_tshirt?.value + "?abcde"}
                        className="absolute w-[65%] h-[75%] object-contain top-[0rem] left-0 right-0 bottom-0 m-auto "
                        alt=""
                      />
                    </DimondBlock>
                  </div>
                </ItemModal>
                <ItemModal
                  className="max-w-[640rem] "
                  content={(close) => (
                    <div
                      className="relative p-[20rem] w-full"
                      style={{
                        backgroundImage: `url(${KitBackground})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img
                        className="w-[50%] md:w-[40%] mx-auto p-[20rem]"
                        src={event?.variables.item_medals?.value}
                        alt="ticket image"
                      />
                      <Typography.Heading className="text-[16rem] md:text-[28rem] text-center text-hr-blue font-extrabold uppercase">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_medals_title_en"
                              : "item_medals_title_vn"
                          ]?.value || ""
                        )}
                      </Typography.Heading>
                      <Typography.Text className="text-[14rem] md:text-[16rem] text-left text-hr-blue font-medium">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_medals_desc_en"
                              : "item_medals_desc_vn"
                          ]?.value || ""
                        )}
                      </Typography.Text>
                      <div
                        className="absolute top-[2%] right-[2%] cursor-pointer"
                        onClick={close}
                      >
                        <X className="w-[30rem] h-[30rem] text-hr-blue font-black" />
                      </div>
                    </div>
                  )}
                >
                  <div
                    ref={kitItem3Ref}
                    className="w-[35%] md:w-[25%] mx-[20rem] md:mx-[0rem] inline-block"
                  >
                    <DimondBlock className="mt-[-20rem] md:mt-0 rounded-[20rem] md:rounded-[40rem] pb-[100%]  shadow-[inset_0rem_0rem_20rem_10rem_#00000055] bg-gradient-to-tr from-brand-honey/80 bg-black to-brand-amber/90">
                      <img
                        src={event?.variables.item_medals?.value + "?abcde"}
                        className="absolute w-[65%] h-[75%] object-contain top-[0rem] left-0 right-0 bottom-0 m-auto "
                        alt=""
                      />
                    </DimondBlock>
                  </div>
                </ItemModal>
              </div>
              <div className="mt-[-20rem] md:mt-0 flex justify-center items-center gap-x-[15rem] md:gap-x-[120rem]">
                <ItemModal
                  className="max-w-[640rem] "
                  content={(close) => (
                    <div
                      className="relative p-[20rem] w-full"
                      style={{
                        backgroundImage: `url(${KitBackground})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img
                        className="w-[50%] md:w-[40%] mx-auto p-[20rem]"
                        src={event?.variables.item_hat?.value}
                        alt="ticket image"
                      />
                      <Typography.Heading className="text-[16rem] md:text-[28rem] text-center text-hr-blue font-extrabold uppercase">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_hat_title_en"
                              : "item_hat_title_vn"
                          ]?.value || ""
                        )}
                      </Typography.Heading>
                      <Typography.Text className="text-[10rem] md:text-[16rem] text-left text-hr-blue font-medium">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_hat_desc_en"
                              : "item_hat_desc_vn"
                          ]?.value || ""
                        )}
                      </Typography.Text>
                      <div
                        className="absolute top-[2%] right-[2%] cursor-pointer"
                        onClick={close}
                      >
                        <X className="w-[30rem] h-[30rem] text-hr-blue font-black" />
                      </div>
                    </div>
                  )}
                >
                  <div
                    ref={kitItem4Ref}
                    className="w-[35%] md:w-[25%] mx-[20rem] md:mx-[0rem] inline-block"
                  >
                    <DimondBlock className="rounded-[20rem] md:rounded-[40rem] pb-[100%]  shadow-[inset_0rem_0rem_20rem_10rem_#00000055] bg-gradient-to-tr from-brand-lime/80 bg-black to-brand-persian/90">
                      <img
                        src={event?.variables.item_hat?.value + "?abcde"}
                        className="absolute w-[65%] h-[75%] object-contain top-[0rem] left-0 right-0 bottom-0 m-auto "
                        alt=""
                      />
                    </DimondBlock>
                  </div>
                </ItemModal>
                <ItemModal
                  className="max-w-[640rem] "
                  content={(close) => (
                    <div
                      className="relative p-[20rem] w-full"
                      style={{
                        backgroundImage: `url(${KitBackground})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img
                        className="w-[30%] md:w-[20%] mx-auto p-[20rem]"
                        src={event?.variables.item_bottle?.value}
                        alt="ticket image"
                      />
                      <Typography.Heading className="text-[16rem] md:text-[28rem] text-center text-hr-blue font-extrabold uppercase">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_bottle_title_en"
                              : "item_bottle_title_vn"
                          ]?.value || ""
                        )}
                      </Typography.Heading>
                      <Typography.Text className="text-[10rem] md:text-[16rem] text-left text-hr-blue font-medium">
                        {parser(
                          event?.variables?.[
                            currentLanguage === "en"
                              ? "item_bottle_desc_en"
                              : "item_bottle_desc_vn"
                          ]?.value || ""
                        )}
                      </Typography.Text>
                      <div
                        className="absolute top-[2%] right-[2%] cursor-pointer"
                        onClick={close}
                      >
                        <X className="w-[30rem] h-[30rem] text-hr-blue font-black" />
                      </div>
                    </div>
                  )}
                >
                  <div
                    ref={kitItem5Ref}
                    className="w-[35%] md:w-[25%] mx-[20rem] md:mx-[0rem] inline-block"
                  >
                    <DimondBlock className="rounded-[20rem] md:rounded-[40rem] pb-[100%]  shadow-[inset_0rem_0rem_20rem_10rem_#00000055] bg-gradient-to-tr from-brand-honey/90 bg-black to-brand-honey/80">
                      <img
                        src={event?.variables.item_bottle?.value + "?abcde"}
                        className="absolute w-[65%] h-[75%] object-contain top-[0rem] left-0 right-0 bottom-0 m-auto "
                        alt=""
                      />
                    </DimondBlock>
                  </div>
                </ItemModal>
              </div>
            </div>
           
          </div>
        )}
      </section>
    );
  }
);
