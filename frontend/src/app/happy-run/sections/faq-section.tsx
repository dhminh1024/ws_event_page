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

export type FAQSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const FAQSection: FC<FAQSectionProps> = ({ className, ...props }) => {
  const { t, currentLanguage } = useLocales();
  const events = useEventPageContext();

  return (
    <div className={cn(className)} {...props}>
      <div className="w-[90%] md:w-[60%] mx-auto py-[20rem] md:py-[60rem]">
        <Typography.Heading
          //   ref={headingRef}
          className="text-[40rem] md:text-[70rem] text-center text-hr-blue font-raceChampion font-extrabold mb-[0rem] md:mb-[50rem]"
        >
          {t("happy_run.faq_heading")}
        </Typography.Heading>
        <Accordion className="mt-[10rem] md:mt-[40rem]" type="multiple">
          {Array.from(Array(7).keys()).map((index) => (
            <AccordionItem
              key={index}
              value={"item" + (index + 1)}
              className="border-none mb-[10rem] md:mb-[20rem]"
            >
              <AccordionTrigger
                className="py-[5rem] md:py-[15rem] pr-[5rem] md:pr-[20rem] hover:!no-underline border-b-[1rem] md:border-b-[2rem] border-b-hr-honey"
                iconClassName="w-[15rem] h-[15rem] md:w-[30rem] md:h-[30rem] text-brand-teal"
              >
                <div className="relative ">
                  <Typography.Paragraph
                    title={
                      events.variables?.[`faq_${index + 1}_question_${currentLanguage}`]?.value
                    }
                    className="line-clamp-2 w-full mb-0 !text-[12rem] text-hr-blue md:!text-[18rem] font-bold"
                  >
                    {index+1}. {events.variables?.[`faq_${index + 1}_question_${currentLanguage}`]?.value}
                  </Typography.Paragraph>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-[20rem]">
                <Typography.Paragraph className="w-full text-[12rem] text-hr-blue leading-normal md:text-[18rem]">
                  {parser(
                    events.variables?.[`faq_${index + 1}_answer_${currentLanguage}`]?.value ||
                      ""
                  )}
                </Typography.Paragraph>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
