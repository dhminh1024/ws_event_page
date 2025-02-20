import {
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useLocales } from "@/core/hooks/use-locales";
import { SectionHeading } from "../components/section-heading";
import TargetObject1 from "@happy-run/assets/images/target-object-1.png";
import TargetLine1 from "@happy-run/assets/images/target-line-1.png";
import TargetObject2 from "@happy-run/assets/images/target-object-2.png";
import TargetLine2 from "@happy-run/assets/images/target-line-2.png";
import TargetObject3 from "@happy-run/assets/images/target-object-3.png";
import TargetLine3 from "@happy-run/assets/images/target-line-3.png";
import TargetObject4 from "@happy-run/assets/images/target-object-4.png";
import Step1VN from "@happy-run/assets/images/target-step-1-vn.png";
import Step1EN from "@happy-run/assets/images/target-step-1-en.png";
import Step2VN from "@happy-run/assets/images/target-step-2-vn.png";
import Step2EN from "@happy-run/assets/images/target-step-2-en.png";
import Step3VN from "@happy-run/assets/images/target-step-3-vn.png";
import Step3EN from "@happy-run/assets/images/target-step-3-en.png";

import gsap from "gsap";
import parser from "html-react-parser";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import ScrollSmoother from "gsap/ScrollSmoother";

import {
  animateBounceUp,
  animateFadeIn,
  animateFadeInBottom,
  animateFadeInLeft,
  animateFadeInRight,
  animateFadeInTop,
  animateZoomInOut,
  drawSVG,
} from "@happy-run/components/animate";
import Typography from "@/app/happy-box/components/typography";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { Button } from "@atoms/button";
import {
  SVGCurlyArrow,
  SVGRoad4,
  SVGRoadDesktop1,
  SVGRoadDesktop2,
  SVGRoadDesktop3,
  SVGRoadMobile1,
  SVGRoadMobile2,
  SVGRoadMobile3,
} from "../components/svg";
import { useResponsive } from "@/core/hooks/use-reponsive";

export type TargetSectionProps = HTMLAttributes<HTMLDivElement> & {};

gsap.registerPlugin(ScrollTrigger);
// ScrollSmoother.create({
//   smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
//   effects: true, // looks for data-speed and data-lag attributes on elements
//   smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
// });

export const TargetSection: FC<TargetSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const events = useEventPageContext();
  const headingRef = useRef(null);

  const objects1Ref = useRef(null);
  const objects2Ref = useRef(null);
  const objects3Ref = useRef(null);

  const objectStep1Ref = useRef(null);
  const targetContent1Ref = useRef(null);

  const objectStep2Ref = useRef(null);
  const targetContent2Ref = useRef(null);

  const objectStep3Ref = useRef(null);
  const targetContent3Ref = useRef(null);

  const line1PCRef = useRef<SVGSVGElement>(null);
  const line1MBRef = useRef<SVGSVGElement>(null);
  const line2PCRef = useRef<SVGSVGElement>(null);
  const line2MBRef = useRef<SVGSVGElement>(null);
  const line3PCRef = useRef<SVGSVGElement>(null);
  const line3MBRef = useRef<SVGSVGElement>(null);
  const line4Ref = useRef<SVGSVGElement>(null);

  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);

  const animateTarget1 = () => {
    animateBounceUp(objects1Ref.current);
    drawSVG(line1PCRef.current);
    drawSVG(line1MBRef.current,{start: "top 100%", end: "top center"});
    animateZoomInOut(objectStep1Ref.current);
    animateFadeInRight(targetContent1Ref.current, {
      start: "top 100%",
      end: "top 60%",
    });
  };
  const animateTarget2 = () => {
    animateBounceUp(objects2Ref.current);
    drawSVG(line2PCRef.current);
    drawSVG(line2MBRef.current,{start: "top 80%", end: "top 0%"});
    animateZoomInOut(objectStep2Ref.current, {
      start: "top 100%",
      end: "top 60%",
    });
    animateFadeInLeft(targetContent2Ref.current, {
      start: "top 100%",
      end: "top 60%",
    });
  };
  const animateTarget3 = () => {
    animateBounceUp(objects3Ref.current);
    drawSVG(line3PCRef.current);
    drawSVG(line3MBRef.current,{start: "top 35%", end: "top 0%"});
    animateZoomInOut(objectStep3Ref.current, {
      start: "top 100%",
      end: "top 60%",
    });
    animateFadeInRight(targetContent3Ref.current, {
      start: "top 100%",
      end: "top 60%",
    });
  };
  const animateTarget4 = () => {
    drawSVG(line4Ref.current,{start: "top 30%", end: "top 0%"});
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      // Heading
      animateZoomInOut(headingRef.current, {
        start: "top 100%",
        end: "top center",
      });
      // Step 1
      animateTarget1();
      animateTarget2();
      animateTarget3();
      animateTarget4();
    }, 200);
  }, []);

  return (
    <div className={cn("pt-[10rem] md:pt-[50rem] mx-auto", className)}>
      <div className="w-[90%] mx-auto">
        <SectionHeading
          ref={headingRef}
          className="text-[10rem] md:text-[30rem] py-[3rem] md:py-[8rem] px-[35rem] md:px-[100rem] italic font-extrabold mb-[50rem]"
        >
          {t("happy_run.target_heading")}
        </SectionHeading>
      </div>
      <div
        className="target px-[10%rem]"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <div className="target-1  flex flex-col">
          <div className="relative w-[87%] self-end">
            <div className="relative pt-[13.2%] md:pt-[12.8%] overflow-hidden">
              <SVGRoadDesktop1
                ref={line1PCRef}
                className="relative bottom-0 right-0 w-full h-auto z-5 hidden md:block"
              />
              <SVGRoadMobile1
                ref={line1MBRef}
                className="relative bottom-0 right-0 w-full h-auto z-5 block md:hidden"
              />
              <img
                ref={objects1Ref}
                src={TargetObject1}
                alt="Target Object 1"
                className="w-[80%] origin-bottom h-auto z-20 absolute top-0 right-[6%] md:right-[2%] scale-[1.08] md:scale-[1]"
              />
            </div>
          </div>
          <div className="relative left-[2%] md:left-[5%] w-[80%] flex items-center gap-x-[10%] md:gap-x-[10%]">
            <img
              ref={objectStep1Ref}
              src={currentLanguage === "en" ? Step1EN : Step1VN}
              alt="Target Step 1"
              className="w-[30%] md:w-[21%] pt-[20rem] pb-[5rem] md:pt-[20rem] md:pb-[20rem]"
            />
            <div
              className="relative top-[-20rem] md:top-[-47rem]"
              ref={targetContent1Ref}
            >
              <Typography.Heading
                level={2}
                className="text-[12rem] md:text-[36rem] font-extrabold text-hr-blue leading-[15rem] md:leading-[45rem]"
              >
                {parser(
                  events.variables?.[
                    currentLanguage === "en"
                      ? "target_1_heading_en"
                      : "target_1_heading_vn"
                  ]?.value || ""
                )}
              </Typography.Heading>
              <Typography.Paragraph
                className={cn(
                  "text-[10rem] md:text-[18rem] font-medium mt-[10rem] text-[#1F6B95] leading-[14rem] md:leading-[24rem] duration-300 overflow-hidden h-0",
                  {
                    "h-[100rem]": collapse1,
                  }
                )}
              >
                {events.variables?.[
                    currentLanguage === "en"
                      ? "target_1_desc_en"
                      : "target_1_desc_vn"
                  ]?.value}
              </Typography.Paragraph>
              <Button
                onClick={() => setCollapse1((value) => !value)}
                className="mt-[20rem] md:mt-[30rem] bg-[linear-gradient(#1F797B,#009180)] p-[4rem_15rem] md:p-[5rem_30rem] text-[10rem] md:text-[18rem] h-auto rounded-[5rem]"
              >
                {t(
                  `happy_run.buttons.${collapse1 ? "view_less" : "view_more"}`
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="relative z-40 target-2 flex flex-col">
          <div className="relative w-[73.9%] mx-auto">
            <div className="relative pt-[2%] md:pt-[0%] overflow-hidden">
              <img
                ref={objects2Ref}
                src={TargetObject2}
                alt="Target Object 2"
                className="w-[72%] origin-bottom h-auto z-30 absolute top-0 left-[14%] md:left-[10%] md:right-[2%] scale-[1.08] md:scale-[1]"
              />
              <div className="relative block md:hidden">
                <SVGRoadMobile2
                  ref={line2MBRef}
                  className="relative bottom-0 md:right-0 w-full h-auto z-5"
                />
              </div>
              <div className="relative hidden md:block">
                <SVGRoadDesktop2
                  ref={line2PCRef}
                  className="relative bottom-0 md:right-0 w-full h-auto z-5"
                />
              </div>
            </div>
          </div>
          <div className="relative w-[90%] md:w-[75%] right-[5.4%] md:right-[6.7%] self-end flex items-center flex-row-reverse gap-x-[15rem] md:gap-x-[75rem]">
            <img
              ref={objectStep2Ref}
              src={currentLanguage === "en" ? Step2EN : Step2VN}
              alt="Target Step 2"
              className="w-[28%] md:w-[25%] py-[10rem] md:py-[40rem]"
            />
            <div className="text-right relative" ref={targetContent2Ref}>
              <Typography.Heading
                level={2}
                className="text-[12rem] md:text-[36rem] font-extrabold text-hr-blue leading-[15rem] md:leading-[45rem]"
              >
                {parser(events.variables?.[
                    currentLanguage === "en"
                      ? "target_2_heading_en"
                      : "target_2_heading_vn"
                  ]?.value || "")}
              </Typography.Heading>
              <Typography.Paragraph
                className={cn(
                  "text-[10rem] md:text-[18rem] font-medium mt-[10rem] text-[#1F6B95] leading-[14rem] md:leading-[24rem] duration-300 overflow-hidden h-0",
                  {
                    "h-[100rem]": collapse2,
                  }
                )}
              >
                {parser(events.variables?.[
                    currentLanguage === "en"
                      ? "target_2_desc_en"
                      : "target_2_desc_vn"
                  ]?.value || "")}
              </Typography.Paragraph>
              <Button
                onClick={() => setCollapse2((value) => !value)}
                className="relative mt-[5rem] md:mt-[30rem] bg-[linear-gradient(#1F797B,#009180)] p-[4rem_15rem] md:p-[5rem_30rem] text-[10rem] md:text-[18rem] h-auto rounded-[5rem] z-40"
              >
                {t(
                  `happy_run.buttons.${collapse2 ? "view_less" : "view_more"}`
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="target-3 flex flex-col md:mt-0">
          <div className="relative w-[73.9%] mx-auto">
            <div className="relative pt-[0%] md:pt-[0.5%]">
              <img
                ref={objects3Ref}
                src={TargetObject3}
                alt="Target Object 3"
                className="w-[72%] origin-bottom h-auto z-30 absolute top-[36%] md:top-0 right-[14%] md:right-[10%] scale-[1.08] md:scale-[1]"
              />
              <div className="relative block md:hidden">
                <SVGRoadMobile3
                  ref={line3MBRef}
                  className="relative bottom-0 md:right-0 w-full h-auto z-5"
                />
              </div>
              <div className="relative hidden md:block">
                <SVGRoadDesktop3
                  ref={line3PCRef}
                  className="relative bottom-0 md:right-0 w-full h-auto z-5"
                />
              </div>
            </div>
          </div>
          <div className="relative left-[2%] md:left-[6%] w-[95%] md:w-[80%] flex items-center gap-x-[10%] md:gap-x-[10%]">
            <img
              ref={objectStep3Ref}
              src={currentLanguage === "en" ? Step3EN : Step3VN}
              alt="Target Step 3"
              className="w-[24%] md:w-[18%] pt-[20rem] pb-[5rem] md:pt-[40rem] md:pb-[20rem]"
            />
            
            <div
              className="relative top-[-5rem] md:top-[-57rem]"
              ref={targetContent3Ref}
            >
              <Typography.Heading
                level={2}
                className="text-[12rem] md:text-[36rem] font-extrabold text-hr-blue leading-[15rem] md:leading-[45rem]"
              >
                {parser(events.variables?.[
                    currentLanguage === "en"
                      ? "target_3_heading_en"
                      : "target_3_heading_vn"
                  ]?.value || "")}
              </Typography.Heading>
              <Typography.Paragraph
                className={cn(
                  "text-[10rem] md:text-[18rem] font-medium mt-[10rem] text-[#1F6B95] leading-[14rem] md:leading-[24rem] duration-300 overflow-hidden h-0",
                  {
                    "h-[100rem]": collapse3,
                  }
                )}
              >
                {events.variables?.[
                    currentLanguage === "en"
                      ? "target_3_desc_en"
                      : "target_3_desc_vn"
                  ]?.value}
              </Typography.Paragraph>
              <Button
                onClick={() => setCollapse3((value) => !value)}
                className="mt-[10rem] md:mt-[30rem] bg-[linear-gradient(#1F797B,#009180)] p-[4rem_15rem] md:p-[5rem_30rem] text-[10rem] md:text-[18rem] h-auto rounded-[5rem]"
              >
                {t(
                  `happy_run.buttons.${collapse3 ? "view_less" : "view_more"}`
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="target-4 flex flex-col mt-[2%] h-[45rem] md:h-auto overflow-hidden ">
          <div className="relative w-[6%]  md:w-[3.3%] left-[13.1%] ">
            <SVGRoad4
              ref={line4Ref}
              className="relative z-5 m-auto w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
