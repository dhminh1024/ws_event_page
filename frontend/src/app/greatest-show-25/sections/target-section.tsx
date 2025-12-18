import {
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useLocales } from "@/core/hooks/use-locales";
import { SectionHeading } from "../components/section-heading";

import gsap from "gsap";
import parser from "html-react-parser";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import ScrollSmoother from "gsap/ScrollSmoother";

import { animateZoomInOut, drawSVG } from "@happy-run/components/animate";
import Typography from "@/app/happy-box/components/typography";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import TargetBox1 from "@greatest-show-25/assets/images/target_1.webp";
import TargetBox2 from "@greatest-show-25/assets/images/target_2.webp";
import TargetBox3 from "@greatest-show-25/assets/images/target_3.webp";
import TargetBox4 from "@greatest-show-25/assets/images/target_4.webp";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { useInView } from "react-intersection-observer";
import Group1 from "@greatest-show-25/assets/images/group-1.webp";
import Group2 from "@greatest-show-25/assets/images/group-2.webp";
import Group3 from "@greatest-show-25/assets/images/group-3.webp";
import Group1Mobile from "@greatest-show-25/assets/images/group-1-mb.webp";
import Group2Mobile from "@greatest-show-25/assets/images/group-2-mb.webp";
import Group3Mobile from "@greatest-show-25/assets/images/group-3-mb.webp";
import Container from "../components/container";
import { animateFadeInTop } from "../components/animate";
import { el } from "date-fns/locale/el";
export type TargetSectionProps = HTMLAttributes<HTMLDivElement> & {};

gsap.registerPlugin(ScrollTrigger);
// ScrollSmoother.create({
//   smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
//   effects: true, // looks for data-speed and data-lag attributes on elements
//   smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
// });

export const TargetSection: FC<TargetSectionProps> = ({ className }) => {
  const { ref: myRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const events = useEventPageContext();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const target1Ref = useRef<HTMLDivElement>(null);
  const target2Ref = useRef<HTMLDivElement>(null);
  const target3Ref = useRef<HTMLDivElement>(null);
  const target4Ref = useRef<HTMLDivElement>(null);

  const group1Ref = useRef<HTMLDivElement>(null);
  const group2Ref = useRef<HTMLDivElement>(null);
  const group3Ref = useRef<HTMLDivElement>(null);

  const scheduleData = useMemo(
    () => [
      {
        heading: t("greatest_show_25.target_group_title_1"),
        desc: t("greatest_show_25.target_group_desc_1"),
        img: TargetBox1,
        ref: target1Ref,
      },
      {
        heading: t("greatest_show_25.target_group_title_2"),
        desc: t("greatest_show_25.target_group_desc_2"),
        img: TargetBox2,
        ref: target2Ref,
      },
      {
        heading: t("greatest_show_25.target_group_title_3"),
        desc: t("greatest_show_25.target_group_desc_3"),
        img: TargetBox3,
        ref: target3Ref,
      },
      {
        heading: t("greatest_show_25.target_group_title_4"),
        desc: t("greatest_show_25.target_group_desc_4"),
        img: TargetBox4,
        ref: target4Ref,
      },
    ],
    [currentLanguage]
  );

  const groupOptions = useMemo(
    () => [
      {
        value: "primary",
        label: t("greatest_show_25.form.group_items.primary_students"),
        heading: t(
          "greatest_show_25.form.group_items.primary_students_heading"
        ),
        description: t(
          "greatest_show_25.form.group_items.primary_students_description"
        ),
        image: isDesktop ? Group1 : Group1Mobile,
        ref: group1Ref,
      },
      {
        value: "secondary",
        label: t("greatest_show_25.form.group_items.secondary_students"),
        heading: t(
          "greatest_show_25.form.group_items.secondary_students_heading"
        ),
        description: t(
          "greatest_show_25.form.group_items.secondary_students_description"
        ),
        image: isDesktop ? Group2 : Group2Mobile,
        ref: group2Ref,
      },
      {
        value: "parent_teacher_staff",
        label: t("greatest_show_25.form.group_items.parent_teacher_staff"),
        heading: t(
          "greatest_show_25.form.group_items.parent_teacher_staff_heading"
        ),
        description: t(
          "greatest_show_25.form.group_items.parent_teacher_staff_description"
        ),
        image: isDesktop ? Group3 : Group3Mobile,
        ref: group3Ref,
      },
    ],
    [currentLanguage, isDesktop]
  );

  useLayoutEffect(() => {
    if (!inView) return;
    setTimeout(() => {
      // Heading
      animateZoomInOut(headingRef.current, {
        start: "top 120%",
        end: "top center",
      });
      // Group animation by order from right to left
      scheduleData.forEach((item, index) => {
        gsap.fromTo(
          item.ref.current,
          { y: isDesktop ? 500 : 300, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            scrollTrigger: {
              trigger: item.ref.current,
              scrub: true,
              start: `top ${120 - index * (isDesktop ? 10 : 0)}%`,
              end: `top ${isDesktop ? 80 : 40}%`,
              // markers: true,
            },
          }
        );
      });
      groupOptions.forEach((item, index) => {
        gsap.fromTo(
          item.ref.current,
          { x: isDesktop ? 0 : -300, y: isDesktop ? 500 : 0, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.9,
            scrollTrigger: {
              trigger: item.ref.current,
              scrub: true,
              start: `top ${100 - index * (isDesktop ? 10 : 0)}%`,
              end: `top 40%`,
              // markers: true,
            },
          }
        );
      });
    }, 200);
  }, [inView]);

  return (
    <section
      ref={myRef}
      className={cn("py-20 md:pt-200 mx-auto overflow-hidden", className)}
    >
      <Container>
        <SectionHeading ref={headingRef} className="">
          {t("greatest_show_25.target_heading")}
        </SectionHeading>
        <div className="target md:m-240">
          <div className=" w-full h-full ">
            <div
              className={cn(
                "grid grid-cols-2 md:grid-cols-4 gap-100 px-80 md:gap-[4%] md:py-0"
              )}
            >
              {scheduleData.map((item, index) => (
                <div
                  className="relative flex flex-col"
                  key={index}
                  ref={item.ref}
                >
                  <img src={item.img} alt={`Target ${index + 1}`} />
                  <div className="absolute top-[40%] left-0 w-full flex flex-col">
                    <Typography.Heading
                      level={2}
                      className="text-center mb-20 md:mb-40 text-[13rem] md:text-[18rem] text-gs25-primary font-extrabold leading-60 md:leading-120 uppercase"
                    >
                      {parser(item.heading)}
                    </Typography.Heading>
                    <div className="text-center text-[10rem] md:text-[20rem] px-80 font-semibold">
                      {parser(item.desc)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <center>
          <div className="text-[11rem] w-[90%] mx-auto md:text-[18rem] my-100 md:my-160">
            {parser(t("greatest_show_25.target_text_1"))}
          </div>
        </center>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-50 md:gap-400 px-30">
          {groupOptions.map((option, index) => {
            return (
              <div
                ref={option.ref}
                key={option.value}
                className={cn("relative flex flex-col justify-between")}
              >
                <img className="w-full" src={option.image} alt={option.label} />
                <div className="absolute top-[23%] left-[50%] md:top-[52%] px-[4%] w-full md:left-0 flex flex-1 flex-col justify-start md:justify-center">
                  <div
                    className={cn(
                      " text-gs25-primary md:text-center text-[14rem] uppercase md:text-[30rem] font-extrabold mb-0"
                    )}
                  >
                    {option.heading}
                  </div>
                  <div
                    className={cn(
                      "md:px-80 text-gs25-secondary text-[7rem] md:text-[20rem] font-medium mb-40",
                      {
                        "md:text-center": index !== 2,
                      }
                    )}
                  >
                    {parser(option.description)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
