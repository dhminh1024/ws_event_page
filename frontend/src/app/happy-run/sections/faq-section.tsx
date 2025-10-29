import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SectionHeading } from "@happy-run/components/section-heading";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@happy-run/components/accordion";
import Typography from "@happy-run/components/typography";
import parser from "html-react-parser";
import { useInView } from "react-intersection-observer";

export type FAQSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const FAQSection: FC<FAQSectionProps> = ({ className, ...props }) => {
  const { ref: myRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });
  const { t, currentLanguage } = useLocales();
  const events = useEventPageContext();

  return (
    <section ref={myRef} className={cn(className)} {...props}>
      {inView && (
        <div className="w-[90%] md:w-[60%] mx-auto py-80 md:py-240">
          <Typography.Heading
            //   ref={headingRef}
            className="text-[40rem] md:text-[70rem] text-center text-hr-blue font-race-champion font-extrabold mb-0 md:mb-200"
          >
            {t("happy_run.faq_heading")}
          </Typography.Heading>
          <Accordion className="mt-40 md:mt-160" type="multiple">
            {Array.from(Array(7).keys()).map((index) => (
              <AccordionItem
                key={index}
                value={"item" + (index + 1)}
                className="border-none mb-40 md:mb-80"
              >
                <AccordionTrigger
                  className="py-20 md:py-60 pr-20 md:pr-80 hover:no-underline! border-b-[1rem] md:border-b-[2rem] border-b-hr-honey"
                  iconClassName="w-60 h-60 md:w-120 md:h-120 text-brand-teal"
                >
                  <div className="relative ">
                    <Typography.Paragraph
                      title={
                        events.variables?.[
                          `faq_${index + 1}_question_${currentLanguage}`
                        ]?.value
                      }
                      className="line-clamp-2 w-full mb-0 text-[12rem]! text-hr-blue md:text-[18rem]! font-bold"
                    >
                      {index + 1}.{" "}
                      {
                        events.variables?.[
                          `faq_${index + 1}_question_${currentLanguage}`
                        ]?.value
                      }
                    </Typography.Paragraph>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-80">
                  <Typography.Paragraph className="w-full text-[12rem] text-hr-blue leading-normal md:text-[18rem]">
                    {parser(
                      events.variables?.[
                        `faq_${index + 1}_answer_${currentLanguage}`
                      ]?.value || ""
                    )}
                  </Typography.Paragraph>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </section>
  );
};
