import React, { HTMLAttributes, useState, type FC } from "react";
import Container from "../components/container";
import { useLocales } from "@/core/hooks/use-locales";
import { cn } from "@/core/utils/shadcn-utils";
import ScrollButton from "../components/scroll-button";
import Typography from "../components/typography";
import { Popover, PopoverContent, PopoverTrigger } from "@atoms/popover";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useSticky } from "@/core/hooks/use-sticky";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

export type MenuBarProps = HTMLAttributes<HTMLDivElement> & {};

export const MenuBar: FC<MenuBarProps> = ({ className }) => {
  const { t } = useLocales();
  // const { ref, isSticky } = useSticky();
  const event = useEventPageContext();
  return (
    <section
      // ref={ref}
      id="navbar"
      aria-labelledby="introduction-title"
      className={cn(
        "sticky top-0 left-0 z-50 hidden md:block ",
        className
      )}
    >
      <div className="pt-[10rem] bg-hr-primary shadow-[inset_0rem_-10rem_20rem_-10rem_#1b1b1b]">
        <Container>
          <NavBar />
        </Container>
      </div>
      <div className="bg-hr-honey py-[5rem] text-center">
        <Typography.Text className=" text-hr-blue font-bold py-[5rem]">
          {t("happy_run.ticket_sale_official_time")}:{" "}
          {event?.variables.ticket_period_time_start?.value} -{" "}
          {event?.variables.ticket_period_time_end?.value}
        </Typography.Text>
      </div>
    </section>
  );
};

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
    },
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
                    "h-full w-[200rem] cursor-pointer rounded-t-[10rem] px-[5rem] text-center bg-gradient-to-t from-[#174C73_] to-[#0C729D] hover:from-[#E16A17] hover:to-[#FFD200] border-t-[5rem] border-[#0C7AA5] hover:border-[#FFD000]"
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
