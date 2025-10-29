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
export type FAQSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const FAQSection: FC<FAQSectionProps> = ({ className }) => {
  const { ref: myRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const event = useEventPageContext();

  return (
    <section id="faq" ref={myRef} className={cn(className)}>
      {inView && (
        <div className="w-[90%] mx-auto md:pt-240">
          <h2
            className="pt-20 md:pt-160 mb-40 md:mb-120 font-ethnocentric bg-gs25-gradient-4 bg-clip-text text-transparent text-[25rem] md:text-[55rem] uppercase font-normal
             flex items-center justify-center"
          >
            FAQ
          </h2>
          <Accordion className="mt-0 md:mt-160" type="multiple">
            {Array.from({ length: 6 }).map((_, index) => (
              <AccordionItem
                key={index}
                value={"item" + (index + 1)}
                className="border-none mb-120 md:mb-320 pl-100 md:pl-400"
              >
                <AccordionTrigger
                  iconClassName="text-white h-80 w-[20rem] md:h-160 md:w-160"
                  className="bg-hr-blue rounded-[5rem] md:rounded-[10rem] shadow-[inset_0rem_0rem_12rem_5rem_#00000055] py-32 md:py-60 pr-40 md:pr-80 hover:no-underline!"
                >
                  <div className="relative cursor-pointer">
                    <DimondBlock
                      className={cn(
                        "absolute top-0 bottom-0 m-auto -left-80 md:-left-200 w-180 h-180 md:w-400 md:h-400 mr-200 rounded-[10rem] md:rounded-[25rem] bg-gs25-gradient-7"
                      )}
                    >
                      <Typography.Paragraph className="mt-40! md:mt-60! leading-1! text-white text-[20rem] md:text-[46rem] text-center font-ethnocentric">
                        0{index + 1}
                      </Typography.Paragraph>
                    </DimondBlock>
                    <p
                      title={t(`happy_run.info_item_title_${index + 1}`)}
                      className="ml-200 md:ml-480 w-[80%] md:w-[88%] line-clamp-1 mb-0 text-[12rem] text-white md:text-[28rem] uppercase font-extrabold"
                    >
                      {event.variables[
                        `faq_${index + 1}_question_${currentLanguage}`
                      ]?.value || ""}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="relative mt-80 md:mt-160 md:pl-400 pr-200">
                  <div className="text-[14rem] md:text-[24rem] text-gs25-secondary font-semibold md:leading-150!">
                    {parser(
                      event.variables[
                        `faq_${index + 1}_answer_${currentLanguage}`
                      ]?.value || ""
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
