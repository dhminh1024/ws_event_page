import React, { HTMLAttributes, useState } from "react";

import Container from "../components/container";
import { useLocales } from "@/core/hooks/use-locales";
import { cn } from "@/core/utils/shadcn-utils";
import ScrollButton from "../components/scroll-button";
import Typography from "../components/typography";
import { Popover, PopoverContent, PopoverTrigger } from "@atoms/popover";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function MenuBar() {
  return (
    <section
      id="navbar"
      aria-labelledby="introduction-title"
      className="sticky left-0 top-0 z-50 hidden md:block"
    >
      <Container className="">
        <NavBar />
      </Container>
    </section>
  );
}

const NavBar = ({
  className,
  isDropdown = false,
}: HTMLAttributes<HTMLDivElement> & { isDropdown?: boolean }) => {
  const { t } = useLocales();

  const [open, setOpen] = useState(false);

  const nav = [
    {
      text: "TONG QUAN",
      to: "introduction",
    },
    {
      text: "HAPPY RUN",
      to: "spread-happiness",
    },
    {
      text: "HAPPY SUMMMER",
      to: "moment-happiness",
    },
    {
      text: "FAQ",
      to: "language-happiness",
    }
  ];

  if (!isDropdown)
    return (
      <div className={cn(className)}>
        <ul className="flex items-center justify-center gap-[12rem] uppercase">
          {nav.map((navItem, key) => (
            <li key={key}>
              <ScrollButton to={navItem.to}>
                <div
                  className={cn(
                    "h-full w-[200rem] cursor-pointer rounded-t-[10rem] px-[5rem] text-center bg-gradient-to-t from-[#174C73_] to-[#0C729D] hover:from-[#E16A17] hover:to-[#FFD200]"
                  )}
                >
                  <div className="flex py-[8rem] h-full items-center justify-center rounded-t-[10rem]">
                    <Typography.Text className="font-sans font-bold uppercase text-[16rem] text-white">
                      {navItem.text}
                    </Typography.Text>
                  </div>
                </div>
              </ScrollButton>
            </li>
          ))}
        </ul>
      </div>
    );
  if (isDropdown)
    return (
      <Popover open={open} onOpenChange={($open: boolean) => setOpen($open)}>
        <PopoverTrigger asChild>
          <button className={className}>
            <HamburgerMenuIcon
              className="h-[23rem] w-[23rem] cursor-pointer rounded-[3rem] bg-hr-persian p-[3rem] text-white"
              strokeWidth={30}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-auto !rounded-[10rem] !border-0 !bg-transparent"
        >
          <ul className="flex flex-col items-center justify-center gap-[5rem] overflow-hidden rounded-[10rem] bg-gray-200 p-[10rem] uppercase">
            {nav.map((navItem, key) => (
              <li
                key={key}
                className={cn(
                  "h-[40rem] w-[200rem] cursor-pointer border-b-[2em] border-transparent pb-[2rem] transition-colors duration-300 "
                )}
              >
                <ScrollButton to={navItem.to}>
                  <div
                    className={cn(
                      "h-full rounded-t-[10rem] px-[3rem] pt-[3rem] text-center shadow-[inset_0_-20rem_20rem_-20rem_rgba(0,0,0,0.6)]"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <div className="py[3rem] flex h-full items-center justify-center rounded-t-[10rem] border-[1.5rem] border-dashed border-white/70 border-b-transparent px-[5rem]">
                      <Typography.Text className="font-itim text-[12rem] text-white">
                        {navItem.text}
                      </Typography.Text>
                    </div>
                  </div>
                </ScrollButton>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    );
};
