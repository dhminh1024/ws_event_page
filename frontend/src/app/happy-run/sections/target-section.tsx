import {
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useLocales } from "@/core/hooks/use-locales";
import { SectionHeading } from "../components/section-heading";
import TargetObject1 from "@happy-run/assets/images/target-object-1.png";
import TargetObject2 from "@happy-run/assets/images/target-object-2.png";
import TargetObject3 from "@happy-run/assets/images/target-object-3.png";
import TargetObject4 from "@happy-run/assets/images/target-object-4.png";
import Step1 from "@happy-run/assets/images/target-step-1.png";
import Step2 from "@happy-run/assets/images/target-step-2.png";
import Step3 from "@happy-run/assets/images/target-step-3.png";
import gsap from "gsap";
import parser from "html-react-parser";
// import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
import { DrawSVGPlugin } from "gsap-trial/dist/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);
import {
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
import { SVGline1, SVGline2, SVGline3, SVGline4 } from "../components/svg";

export type TargetSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const TargetSection: FC<TargetSectionProps> = ({ className }) => {
  const { t } = useLocales();
  const events = useEventPageContext();
  const headingRef = useRef(null);
  const object1Ref = useRef(null);
  const objectStep1Ref = useRef(null);
  const targetContent1Ref = useRef(null);
  const object2Ref = useRef(null);
  const objectStep2Ref = useRef(null);
  const targetContent2Ref = useRef(null);
  const object3Ref = useRef(null);
  const objectStep3Ref = useRef(null);
  const targetContent3Ref = useRef(null);
  const object4Ref = useRef(null);
  const line1Ref = useRef<SVGSVGElement>(null);
  const line2Ref = useRef<SVGSVGElement>(null);
  const line3Ref = useRef<SVGSVGElement>(null);
  const line4Ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      // Heading
      animateZoomInOut(headingRef.current, {
        start: "top 100%",
        end: "top center",
      });
      // Step 1
      animateFadeInRight(object1Ref.current, {
        start: "top center",
        end: "top 20%",
      });
      animateFadeInRight(line1Ref.current, {
        start: "top center",
        end: "top 20%",
      });
      drawSVG(line1Ref.current);
      animateFadeInLeft(objectStep1Ref.current, { start: "top 140%" });
      animateFadeInRight(targetContent1Ref.current, {
        start: "top 80%",
        end: "top center",
      });
      // Step 2
      animateFadeIn(object2Ref.current);
      animateFadeInRight(objectStep2Ref.current, {
        start: "top 100%",
        end: "top center",
      });
      animateFadeInLeft(targetContent2Ref.current, {
        start: "top 80%",
        end: "top center",
      });
      animateFadeIn(line2Ref.current);
      drawSVG(line2Ref.current, { start: "top 80%" });
      // Step 3
      animateFadeIn(object3Ref.current);
      animateFadeInLeft(objectStep3Ref.current, { start: "top 140%" });
      animateFadeInRight(targetContent3Ref.current, {
        start: "top 80%",
        end: "top center",
      });
      animateFadeIn(line3Ref.current);
      drawSVG(line3Ref.current, { start: "top 80%" });
      // Step 4
      animateFadeInBottom(object4Ref.current);
      animateFadeInBottom(line4Ref.current);
      drawSVG(line4Ref.current, { start: "top 80%" });
    }, 200);
  }, []);

  return (
    <div className={cn("py-[120rem] mx-auto", className)}>
      <div className="w-[90%] mx-auto">
        <SectionHeading
          ref={headingRef}
          className="text-[30rem] italic font-extrabold mb-[50rem]"
        >
          {t("happy_run.target_heading")}
        </SectionHeading>
      </div>
      <div className="target px-[10%rem]">
        <div className="target-1  flex flex-col">
          <div className="relative w-[87%] self-end">
            <img
              ref={object1Ref}
              src={TargetObject1}
              alt="Target Object 1"
              className="w-full h-auto"
            />
            <SVGline1
              ref={line1Ref}
              className="absolute z-20 bottom-[-103rem] right-[-18rem] w-full h-full"
            />
          </div>
          <div className="content relative left-[5%] w-[80%] flex gap-x-[115rem]">
            <img
              ref={objectStep1Ref}
              src={Step1}
              alt="Target Step 1"
              className="w-[21%] pt-[40rem] pb-[20rem]"
            />
            <div className="relative top-[-67rem]" ref={targetContent1Ref}>
              <Typography.Heading
                level={2}
                className="text-[38rem] font-extrabold text-hr-blue leading-[45rem]"
              >
                {parser(events.variables?.target_1_heading_vn?.value || "")}
              </Typography.Heading>
              <Button className="mt-[30rem] bg-[linear-gradient(#1F797B,#009180)] p-[5rem_30rem] text-[20rem] h-auto rounded-[5rem]">
                View more
              </Button>
            </div>
          </div>
        </div>
        <div className="target-2 flex flex-col">
          <div className="relative w-[73.5%] mx-auto">
            <img
              ref={object2Ref}
              src={TargetObject2}
              alt="Target Object 2"
              className="w-full h-auto"
            />
            <SVGline2
              ref={line2Ref}
              className="absolute z-20 top-[3rem] left-[23rem] w-[96%] h-full"
            />
          </div>
          <div className="relative right-[7.5%] self-end flex flex-row-reverse gap-x-[75rem]">
            <img
              ref={objectStep2Ref}
              src={Step2}
              alt="Target Step 2"
              className="w-[18%] pt-[40rem] "
            />
            <div
              className="text-right relative top-[-40rem]"
              ref={targetContent2Ref}
            >
              <Typography.Heading
                level={2}
                className="text-[38rem] font-extrabold text-hr-blue leading-[48rem]"
              >
                {parser(events.variables?.target_2_heading_vn?.value || "")}
              </Typography.Heading>
              <Typography.Paragraph className="text-[20rem] font-medium mt-[10rem] text-[#1F6B95] leading-[24rem]">
                {parser(events.variables?.target_2_desc_vn?.value || "")}
              </Typography.Paragraph>
              <Button className="mt-[20rem] bg-[linear-gradient(#1F797B,#009180)] p-[5rem_30rem] text-[20rem] h-auto rounded-[5rem]">
                View more
              </Button>
            </div>
          </div>
        </div>
        <div className="target-3 flex flex-col">
          <div className="relative w-[73.5%] mx-auto">
            <img
              ref={object3Ref}
              src={TargetObject3}
              alt="Target Object 3"
              className="w-full h-auto"
            />
            <SVGline3
              ref={line3Ref}
              className="absolute z-20 top-[14rem] right-[16rem] w-[96.6%] h-full"
            />
          </div>

          <div className="content relative w-[80%] left-[8.5%] flex gap-x-[115rem]">
            <img
              ref={objectStep3Ref}
              src={Step3}
              alt="Target Step 3"
              className="w-[18%] relative py-[30rem]"
            />
            <div className="relative top-[-47rem]" ref={targetContent3Ref}>
              <Typography.Heading
                level={2}
                className="text-[38rem] font-extrabold text-hr-blue leading-[45rem]"
              >
                {parser(events.variables?.target_3_heading_vn?.value || "")}
              </Typography.Heading>
              <Button className="mt-[30rem] bg-[linear-gradient(#1F797B,#009180)] p-[5rem_30rem] text-[20rem] h-auto rounded-[5rem]">
                View more
              </Button>
            </div>
          </div>
        </div>
        <div className="target-4 flex flex-col">
          <div className="relative w-[3.3%] left-[13.4%]">
            <img
              ref={object4Ref}
              src={TargetObject4}
              alt="Target Object 4"
              className="relative w-full h-auto"
            />
            <SVGline4
              ref={line4Ref}
              className="absolute z-20 top-[20rem] right-[0] left-[0] m-auto w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
