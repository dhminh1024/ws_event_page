import React, { HTMLAttributes, useState, useEffect, useRef, type FC } from "react";
import Container from "../components/container";
import { useLocales } from "@/core/hooks/use-locales";
import { cn } from "@/core/utils/shadcn-utils";
import ScrollButton from "../components/scroll-button";
import Typography from "../components/typography";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { LanguageSelector } from "../components/language-selector";
import Marquee from "react-fast-marquee";
import { LanguageSwitcher } from "../components/language-switcher";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type MenuBarProps = HTMLAttributes<HTMLDivElement> & {};

export const MenuBar: FC<MenuBarProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    let st: ScrollTrigger | null = null;

    // Delay to allow page to fully render
    const timer = setTimeout(() => {
      if (!navRef.current) return;

      st = ScrollTrigger.create({
        trigger: navRef.current,
        start: "top top",
        end: "+=999999", // Keep pinned throughout entire scroll
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true, // Recalculate on refresh
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      if (st) {
        st.kill();
      }
    };
  }, []);

  return (
    <section
      ref={navRef}
      id="navbar"
      aria-labelledby="introduction-title"
      className={cn("z-2000", className)}
    >
      <div className="pt-40 bg-hr-primary shadow-[inset_0rem_-10rem_20rem_-10rem_#1b1b1b]">
        <Container className="relative">
          <NavBar />
          <LanguageSwitcher className="absolute top-[50%] w-60 h-40 md:w-140 md:h-100 right-20 md:right-0 translate-y-[-50%]" />
        </Container>
      </div>
      <Marquee
        speed={100}
        className="bg-gs25-primary py-20 md:py-50 text-center overflow-hidden"
      >
        <Typography.Text className=" text-white text-[9rem] md:text-[18rem] font-bold py-30">
          {event?.variables?.[`marquee_text_${currentLanguage}`]?.value}
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
                  "h-full w-240 md:w-800 cursor-pointer rounded-t-[5rem] md:rounded-t-[10rem] px-20 text-center bg-linear-to-t from-[#081b61] to-[#0429A9] hover:from-[#E16A17] hover:to-[#FFD200] border-t-[2rem] md:border-t-[5rem] border-[#0229B2] hover:border-[#FFD000]"
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
