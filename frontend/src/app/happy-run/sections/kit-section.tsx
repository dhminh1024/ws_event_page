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
import BorderWrapper from "../components/border-wrapper";
import LightEffect from "@happy-run/assets/images/light-effect.webp";
import RobotLegsImage from "@happy-run/assets/images/robot-legs.webp";
import RobotBodyImage from "@happy-run/assets/images/robot-body.webp";
import RobotCameraImage from "@happy-run/assets/images/robot-camera.webp";
import { Button } from "@atoms/button";
import { DimondBlock } from "../components/dimond-block";
import { ItemModal } from "../components/item-modal";
import KitBackground from "@happy-run/assets/images/kit-background.webp";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
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
    const robotBodyRef = useRef<HTMLImageElement>(null);
    const LightEffectRef = useRef<HTMLImageElement>(null);

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

        if (robotBodyRef.current && LightEffectRef.current) {
          gsap.to(robotBodyRef.current, {
            rotation: 5,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            repeatDelay: 0.1,
          });
          gsap.to(LightEffectRef.current, {
            scale: 1.1,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            repeatDelay: 0.1,
          });
        }
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
              <div className="flex flex-wrap justify-center items-center gap-x-[20rem] md:gap-x-[120rem]">
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
              <div className="mt-[-20rem] md:mt-0 flex justify-center items-center gap-x-[60rem] md:gap-x-[120rem]">
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
            <div className="w-full md:w-[90%] mx-auto bg-gradient-to-b from-brand-teal to-brand-persian shadow-[inset_0rem_0rem_20rem_10rem_#00000055] p-[10rem] rounded-[8rem] md:rounded-[25rem] mt-[50rem] md:mt-[150rem]">
              <BorderWrapper
                dashedArray={isDesktop ? 16 : 10}
                radius={isDesktop ? 20 : 10}
                dashedOffset={10}
                strokeWidth={isDesktop ? 3 : 2}
                widthOffset={isDesktop ? 0.5 : 2}
                className="relative flex justify-between items-center py-[10rem]  md:py-[40rem]"
              >
                <div className="w-[30%] md:w-[20%]">
                  <div className="absolute z-10 bottom-[-12.5%] md:bottom-[-5.5%] left-[0%] md:left-[3%] w-[100rem] h-[150rem] md:w-[200rem] md:h-[300rem]">
                    <div
                      ref={robotBodyRef}
                      className="absolute rotate-[-10deg] origin-bottom left-0 bottom-[12%] right-0 m-auto z-10 "
                    >
                      <img
                        ref={LightEffectRef}
                        src={LightEffect}
                        className="absolute scale-0 origin-center right-[-22%] top-[-5%] z-20 w-[50%]"
                        alt="Camera"
                      />
                      <img src={RobotBodyImage} className="w-full" alt="Body" />
                    </div>
                    <img
                      src={RobotLegsImage}
                      className="absolute  bottom-0 right-[14%] w-[65%]"
                      alt="Legs"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col md:flex-row justify-center items-center">
                  <div className="flex flex-col justify-center items-center">
                    <Typography.Text className="text-[10rem] md:text-[28rem] text-hr-honey font-extrabold uppercase leading-[10rem] md:leading-[40rem] m-0">
                      {t("happy_run.search_image_heading")}
                    </Typography.Text>
                    <Typography.Text className="text-[8rem] md:text-[20rem] md:mb-[5rem] md:leading-[23rem] font-semibold text-hr-honey ">
                      {parser(t("happy_run.search_image_desc"))}
                    </Typography.Text>
                    <Typography.Text className="text-[8rem] md:text-[20rem] mb-[5rem] md:leading-[23rem] text-white italic">
                      {parser(t("happy_run.search_image_note"))}
                    </Typography.Text>
                  </div>
                  <Link to={event.variables.search_image_ai?.value || ""}>
                    <Button className="text-[8rem] md:text-[20rem] mx-[60rem] p-[3rem_20rem] md:p-[10rem_20rem] h-auto bg-hr-honey hover:bg-hr-honey/80 border-y-[2rem] md:border-t-[5rem] border-t-white/30 border-b-transparent shadow-none outline-none rounded-[5rem] italic">
                      {t("happy_run.buttons.search_now")}
                    </Button>
                  </Link>
                </div>
              </BorderWrapper>
            </div>
          </div>
        )}
      </section>
    );
  }
);
