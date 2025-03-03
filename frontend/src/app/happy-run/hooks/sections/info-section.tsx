import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SectionHeading } from "../components/section-heading";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@happy-run/components/accordion";
import Typography from "../components/typography";
import { DimondBlock } from "../components/dimond-block";
import parser from "html-react-parser";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { useInView } from "react-intersection-observer";
export type InfoSectionProps = HTMLAttributes<HTMLDivElement> & {};

const ColorItems = [
  "from-brand-teal to-brand-persian",
  "from-brand-lime to-brand-teal",
  "from-brand-honey to-brand-lime",
  "from-brand-honey to-brand-amber",
  "from-brand-amber to-brand-amber",
];

export const InfoSection: FC<InfoSectionProps> = ({ className }) => {
  const { ref: myRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const event = useEventPageContext();

  return (
    <section ref={myRef} className={cn(className)}>
      {inView && (
        <div className="w-[90%] mx-auto pt-[60rem]">
          <SectionHeading
            //   ref={headingRef}
            className="text-[12rem] md:text-[25rem] p-[3rem_40rem] md:p-[10rem_70rem] italic font-extrabold mb-[50rem]"
          >
            {t("happy_run.info_heading")}
          </SectionHeading>
          <Accordion className="mt-[0rem] md:mt-[40rem]" type="multiple">
            {ColorItems?.map((c, index) => (
              <AccordionItem
                key={index}
                value={"item" + (index + 1)}
                className="border-none mb-[30rem] md:mb-[80rem] pl-[30rem] md:pl-[100rem]"
              >
                <AccordionTrigger
                  iconClassName="text-white h-[20rem] w-[20rem] md:h-[40rem] md:w-[40rem]"
                  className="bg-[#0575FF] rounded-[5rem] md:rounded-[10rem] shadow-[inset_0rem_0rem_12rem_5rem_#00000055] py-[8rem] md:py-[15rem] pr-[10rem] md:pr-[20rem] hover:!no-underline"
                >
                  <div className="relative ">
                    <DimondBlock
                      className={cn(
                        "absolute top-0 bottom-0 m-auto left-[-20rem] md:left-[-50rem] w-[45rem] h-[45rem] md:w-[100rem] md:h-[100rem] mr-[50rem] rounded-[10rem] md:rounded-[30rem] bg-gradient-to-tr bg-white drop-shadow-[2rem_-2rem_2rem_#00000083] md:drop-shadow-[10rem_-5rem_5rem_#00000083]",
                        c
                      )}
                    >
                      <Typography.Paragraph className="m-0 text-white text-[22rem] md:text-[50rem] text-center font-raceChampion">
                        0{index + 1}
                      </Typography.Paragraph>
                    </DimondBlock>
                    <Typography.Paragraph
                      title={t(`happy_run.info_item_title_${index + 1}`)}
                      className="ml-[70rem] md:ml-[120rem] line-clamp-1 w-full mb-0 !text-[12rem]  text-white md:!text-[28rem] uppercase font-extrabold"
                    >
                      {t(`happy_run.info_item_title_${index + 1}`)}
                    </Typography.Paragraph>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="relative mt-[20rem] md:mt-[40rem] text-hr-primary">
                  <div className="w-full min-h-[50rem] md:min-h-[200rem]">
                    <img
                      className="w-full"
                      src={
                        event.variables[
                          `info_item_${index + 1}_${
                            isDesktop ? "pc" : "mb"
                          }_${currentLanguage}`
                        ]?.value
                      }
                      alt=""
                    />
                    {index === 2 && (
                      <div className="md:absolute rounded-[5rem] overflow-hidden mt-[10rem] md:mt-0 w-full h-[200rem] md:w-[450rem] md:h-[300rem] top-[0%] md:top-[10%] bottom-0 m-auto right-[8%]">
                        <iframe
                          src={event.variables.wellspring_map_embed?.value}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          style={{ width: "100%", height: "100%" }}
                        ></iframe>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </section>
  );
};
