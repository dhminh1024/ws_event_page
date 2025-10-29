import React, { HTMLAttributes } from "react";
import LogoWhite from "@happy-box/assets/images/logo-white.webp";
import Typography from "../components/typography";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";

type SectionProps = HTMLAttributes<HTMLDivElement> & {};

export default function Footer({ className }: SectionProps) {
  const { t } = useLocales();
  const event = useEventPageContext();
  return (
    <section
      id="contact"
      aria-labelledby="Footer"
      className={cn("relative font-sans", className)}
    >
      <div className="bg-hr-primary py-80 md:py-200">
        <div className="px-120 ">
          <div className="flex flex-col items-center gap-x-400 gap-y-80 md:flex-row">
            <div className="mt-60 w-[65%] md:mt-0 md:w-auto md:basis-[40%] md:pl-[10%]">
              <img
                className=" mx-auto w-full"
                src={event.variables?.logo_wellspring_white?.value}
                alt="Logo White"
              />
            </div>

            <div className="flex w-full flex-1 flex-col text-white">
              <Typography.Heading
                level={3}
                className="mb-80 font-sans text-[12rem] font-black md:text-[20rem]"
              >
                {event.variables?.wellspring_name?.value}
              </Typography.Heading>
              <div className="grid grid-cols-2 mb-40">
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-20 font-sans text-[12rem] font-semibold md:text-[18rem]"
                  >
                    Wellspring Hanoi
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                    {event.variables?.wellspring_hanoi_hotline?.value}
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-20 font-sans text-[12rem] font-semibold md:text-[18rem]"
                  >
                    Admissions
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                    {
                      event.variables?.wellspring_hanoi_admissions_hotline
                        ?.value
                    }
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                    {event.variables?.wellspring_hanoi_admissions_email?.value}
                  </Typography.Paragraph>
                </div>
              </div>
              <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                {event.variables?.wellspring_website?.value}
              </Typography.Paragraph>
              <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                {event.variables?.wellspring_hanoi_address?.value}
              </Typography.Paragraph>

              <div className="my-80 h-4 w-[18%] bg-white md:my-120 md:h-8"></div>

              <div className="grid grid-cols-2  mb-40">
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-20 font-sans text-[12rem] font-semibold md:text-[18rem]"
                  >
                    Wellspring Saigon
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                    {event.variables?.wellspring_saigon_hotline?.value}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                    {event.variables?.wellspring_saigon_website?.value}
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-20 font-sans text-[12rem] font-semibold md:text-[18rem]"
                  >
                    Admissions
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                    {
                      event.variables?.wellspring_saigon_admissions_hotline
                        ?.value
                    }
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                    {event.variables?.wellspring_saigon_admissions_email?.value}
                  </Typography.Paragraph>
                </div>
              </div>
              <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                {event.variables?.wellspring_website?.value}
              </Typography.Paragraph>
              <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                {event.variables?.wellspring_saigon_address?.value}
              </Typography.Paragraph>

              <div className="my-80 h-4 w-[18%] bg-white md:my-120 md:h-8"></div>
              <Typography.Heading
                level={4}
                className="mb-20 font-sans text-[12rem] font-semibold md:text-[18rem]"
              >
                {t("happy_run.collaboration_units")}
              </Typography.Heading>
              <img className="w-[15%] mt-80" src={event.variables?.unit_1?.value} alt="Unit 1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
