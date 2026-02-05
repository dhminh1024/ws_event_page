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
import { useResponsive } from "@/core/hooks/use-reponsive";

export type InfoSectionProps = HTMLAttributes<HTMLDivElement> & {};

const ColorItems = [
  "from-brand-teal to-brand-persian",
  "from-brand-lime to-brand-teal",
  "from-brand-honey to-brand-lime",
  "from-brand-honey to-brand-amber",
  "from-brand-amber to-brand-amber",
];

export const InfoSection: FC<InfoSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const event = useEventPageContext();

  return (
    <section className={cn(className)}>
      <div className="w-[90%] mx-auto pt-240">
        <SectionHeading
          className="text-[12rem] md:text-[25rem] p-[3rem_40rem] md:p-[10rem_70rem] italic font-extrabold mb-200"
        >
          {t("happy_run.info_heading")}
        </SectionHeading>
        <Accordion className="mt-0 md:mt-160" type="multiple">
          {ColorItems?.map((c, index) => (
            <AccordionItem
              key={index}
              value={"item" + (index + 1)}
              className="border-none mb-120 md:mb-320 pl-120 md:pl-400"
            >
              <AccordionTrigger
                iconClassName="text-white h-80 w-[20rem] md:h-160 md:w-160"
                className="bg-[#0575FF] rounded-[5rem] md:rounded-[10rem] shadow-[inset_0rem_0rem_12rem_5rem_#00000055] py-32 md:py-60 pr-40 md:pr-80 hover:no-underline!"
              >
                <div className="relative ">
                  <DimondBlock
                    className={cn(
                      "absolute top-0 bottom-0 m-auto -left-80 md:-left-200 w-180 h-180 md:w-400 md:h-400 mr-200 rounded-[10rem] md:rounded-[20rem] bg-linear-to-tr  drop-shadow-[2rem_-2rem_2rem_#00000083] md:drop-shadow-[10rem_-5rem_5rem_#00000083]",
                      c
                    )}
                  >
                    <Typography.Paragraph className="m-0 text-white text-[22rem] md:text-[50rem] text-center font-race-champion">
                      0{index + 1}
                    </Typography.Paragraph>
                  </DimondBlock>
                  <Typography.Paragraph
                    title={t(`happy_run.info_item_title_${index + 1}`)}
                    className="ml-280 md:ml-480 line-clamp-1 w-full mb-0 text-[12rem]!  text-white md:text-[28rem]! uppercase font-extrabold"
                  >
                    {t(`happy_run.info_item_title_${index + 1}`)}
                  </Typography.Paragraph>
                </div>
              </AccordionTrigger>
              <AccordionContent className="relative mt-80 md:mt-160 text-hr-primary">
                <div className="w-full min-h-200 md:min-h-800">
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
                    <div className="md:absolute rounded-[5rem] overflow-hidden mt-40 md:mt-0 w-full h-800 md:w-1800 md:h-1200 top-[0%] md:top-[10%] bottom-0 m-auto right-[8%]">
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
    </section>
  );
};
