import React, { HTMLAttributes } from "react";
import LogoWhite from "@happy-box/assets/images/logo-white.png";
import Typography from "../components/typography";
import { cn } from "@/core/utils/shadcn-utils";

type SectionProps = HTMLAttributes<HTMLDivElement> & {};

export default function Footer({ className }: SectionProps) {
  return (
    <section
      id="contact"
      aria-labelledby="Footer"
      className={cn("relative font-sans", className)}
    >
      <div className="bg-happy_box-blue py-[20rem] md:py-[50rem]">
        <div className="container px-[40rem] ">
          <div className="flex flex-col items-center gap-x-[100rem] gap-y-[20rem] md:flex-row">
            <div className="mt-[15rem] w-[65%] md:mt-0 md:w-auto md:basis-[40%] md:pl-[10%]">
              <img
                className=" mx-auto w-full"
                src={LogoWhite}
                alt="Logo White"
              />
            </div>

            <div className="flex w-full flex-1 flex-col text-white">
              <Typography.Heading
                level={3}
                className="mb-[20rem] font-sans text-[10rem] font-black md:text-[20rem]"
              >
                WELLSPRING INTERNATIONAL BILINGUAL SCHOOLS Wellspring
              </Typography.Heading>
              <div className="grid grid-cols-2 mb-[10rem]">
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-[5rem] font-sans text-[10rem] font-semibold md:text-[18rem]"
                  >
                    Wellspring Hanoi
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                    (+84) 24 7305 8668
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-[5rem] font-sans text-[10rem] font-semibold md:text-[18rem]"
                  >
                    Admissions
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                    (+84) 973 759 229
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                    tuyensinh@wellspring.edu.vn
                  </Typography.Paragraph>
                </div>
              </div>
              <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                www.wellspring.edu.vn
              </Typography.Paragraph>
              <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                95 Ai Mo St., Bo De Ward, Long Bien Dist., Ha Noi
              </Typography.Paragraph>

              <div className="my-[20rem] h-[1rem] w-[18%] bg-white md:my-[30rem] md:h-[2rem]"></div>
              <Typography.Heading
                level={3}
                className="mb-[20rem] font-sans text-[10rem] font-black md:text-[20rem]"
              >
                WELLSPRING INTERNATIONAL BILINGUAL SCHOOLS Wellspring
              </Typography.Heading>
              <div className="grid grid-cols-2  mb-[10rem]">
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-[5rem] font-sans text-[10rem] font-semibold md:text-[18rem]"
                  >
                    Wellspring Saigon
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                    (+84) 28 3840 9292
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                    wssg@wellspringsaigon.edu.vn
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-col">
                  <Typography.Heading
                    level={4}
                    className="mb-[5rem] font-sans text-[10rem] font-semibold md:text-[18rem]"
                  >
                    Admissions
                  </Typography.Heading>
                  <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                    (+84) 937 099 229
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                    admissions@wellspringsaigon.edu.vn
                  </Typography.Paragraph>
                </div>
              </div>
              <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                www.wellspringsaigon.edu.vn
              </Typography.Paragraph>
              <Typography.Paragraph className="text-[8rem] font-light md:text-[16rem]">
                92 Nguyen Huu Canh St., Ward 22, Binh Thanh Dist., Ho Chi Minh
                City
              </Typography.Paragraph>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
