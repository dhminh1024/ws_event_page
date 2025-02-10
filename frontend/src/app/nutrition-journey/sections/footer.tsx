import React, { HTMLAttributes } from "react";
import LogoWhite from "@happy-box/assets/images/logo-white.png";
import Typography from "../components/typography";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

type SectionProps = HTMLAttributes<HTMLDivElement> & {};

export default function Footer({ className }: SectionProps) {
  const event = useEventPageContext();
  return (
    <section
      id="contact"
      aria-labelledby="Footer"
      className={cn("relative font-sans mt-[60rem]", className)}
    >
      <div className="bg-nj-blue py-[20rem] md:py-[50rem]">
        <div className="px-[30rem] ">
          <div className="flex flex-col items-center gap-x-[100rem] gap-y-[20rem] md:flex-row">
            <div className="mt-[15rem] w-[65%] md:mt-0 md:w-auto md:basis-[40%] md:pl-[10%]">
              <img
                className=" mx-auto w-full"
                src={event.variables?.logo_wellspring_white?.value}
                alt="Logo White"
              />
            </div>

            <div className="flex w-full flex-1 flex-col text-white">
              <Typography.Heading
                level={3}
                className="mb-[20rem] font-sans text-[12rem] font-black md:text-[20rem]"
              >
                {event.variables?.wellspring_name?.value}
              </Typography.Heading>
              <div className="grid grid-cols-2 mb-[10rem]">
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-[5rem] font-sans text-[12rem] font-semibold md:text-[18rem]"
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
                    className="mb-[5rem] font-sans text-[12rem] font-semibold md:text-[18rem]"
                  >
                    Admissions
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                    {event.variables?.wellspring_hanoi_admissions_hotline?.value}
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

              <div className="my-[20rem] h-[1rem] w-[18%] bg-white md:my-[30rem] md:h-[2rem]"></div>

              <div className="grid grid-cols-2  mb-[10rem]">
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-[5rem] font-sans text-[12rem] font-semibold md:text-[18rem]"
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
                    className="mb-[5rem] font-sans text-[12rem] font-semibold md:text-[18rem]"
                  >
                    Admissions
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[10rem] font-light md:text-[16rem]">
                    {event.variables?.wellspring_saigon_admissions_hotline?.value}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
