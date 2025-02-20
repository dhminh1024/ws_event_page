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
      className={cn("sticky top-0 left-0 z-50", className)}
    >
      <div className="pt-[10rem] bg-hr-primary shadow-[inset_0rem_-10rem_20rem_-10rem_#1b1b1b]">
        <Container>
          <NavBar />
        </Container>
      </div>
      <div className="bg-hr-honey py-[2rem] md:py-[5rem] text-center">
        <Typography.Text className=" text-hr-blue text-[8rem] md:text-[16rem] font-bold py-[5rem]">
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
      text: t("happy_run.nav_item_1"),
      to: "overview",
    },
    {
      text: t("happy_run.nav_item_2"),
      to: "happy-run",
    },
    {
      text: t("happy_run.nav_item_3"),
      to: "happy-summer",
    },
    {
      text: t("happy_run.nav_item_4"),
      to: "faq",
    },
  ];

  return (
    <div className={cn(className)}>
      <ul className="flex items-center justify-center gap-[5rem] md:gap-[12rem] uppercase">
        {nav.map((navItem, key) => (
          <li key={key}>
            <ScrollButton to={navItem.to}>
              <div
                className={cn(
                  "h-full w-[85rem] md:w-[200rem] cursor-pointer rounded-t-[5rem] md:rounded-t-[10rem] px-[5rem] text-center bg-gradient-to-t from-[#174C73_] to-[#0C729D] hover:from-[#E16A17] hover:to-[#FFD200] border-t-[2rem] md:border-t-[5rem] border-[#0C7AA5] hover:border-[#FFD000]"
                )}
              >
                <div className="flex py-[4rem] md:py-[8rem] h-full items-center justify-center rounded-t-[10rem]">
                  <Typography.Text className="font-sans font-bold uppercase text-[7rem] md:text-[16rem] text-white">
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
};
