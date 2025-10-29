import React, { HTMLAttributes, useState, type FC } from "react";
import Container from "../components/container";
import { useLocales } from "@/core/hooks/use-locales";
import { cn } from "@/core/utils/shadcn-utils";
import ScrollButton from "../components/scroll-button";
import Typography from "../components/typography";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { LanguageSelector } from "../components/language-selector";
import Marquee from "react-fast-marquee";
import { LanguageSwitcher } from "../components/language-switcher";

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
      className={cn("sticky top-0 left-0 z-9999", className)}
    >
      <div className="pt-40 bg-hr-primary shadow-[inset_0rem_-10rem_20rem_-10rem_#1b1b1b]">
        <Container className="relative">
          <NavBar />
          {/* <LanguageSwitcher className="absolute top-0 right-0 block md:hidden" /> */}
        </Container>
      </div>
      <Marquee
        speed={100}
        className="bg-gs25-primary py-20 md:py-50 text-center"
      >
        <Typography.Text className=" text-white text-[9rem] md:text-[18rem] font-bold py-30">
          {t("happy_run.ticket_sale_official_time")}:{" "}
          {event?.variables.ticket_period_time_start?.value} -{" "}
          {event?.variables.ticket_period_time_end?.value}
        </Typography.Text>
      </Marquee>
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
      text: t("greatest_show_25.nav_item_1"),
      to: "overview",
    },
    {
      text: t("greatest_show_25.nav_item_2"),
      to: "awards",
    },
    {
      text: t("greatest_show_25.nav_item_3"),
      to: "journey",
    },
    {
      text: t("greatest_show_25.nav_item_4"),
      to: "faq",
    },
    {
      text: t("greatest_show_25.nav_item_5"),
      to: "contact",
    },
  ];

  return (
    <div className={cn(className)}>
      <ul className="flex items-center justify-center gap-20 md:gap-48 uppercase">
        {nav.map((navItem, key) => (
          <li key={key}>
            <ScrollButton to={navItem.to}>
              <div
                className={cn(
                  "h-full w-240 md:w-800 cursor-pointer rounded-t-[5rem] md:rounded-t-[10rem] px-20 text-center bg-linear-to-t from-[#0229B2] to-[#0429A9] hover:from-[#E16A17] hover:to-[#FFD200] border-t-[2rem] md:border-t-[5rem] border-[#0229B2] hover:border-[#FFD000]"
                )}
              >
                <div className="flex py-16 md:py-32 h-full items-center justify-center rounded-t-[10rem]">
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
