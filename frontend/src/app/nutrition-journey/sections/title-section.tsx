import { useState, type FC } from "react";
import Typography from "@nutrition-journey/components/typography";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

export type TitleSectionProps = {
  className?: string;
};

export const TitleSection: FC<TitleSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();

  return (
    <section className="relative mb-[10rem] md:mb-[40rem]">
      {/* Section Heading */}
      <div className="relative z-10 text-center">
        <img
          src={event.variables.campaign_title?.value}
          className="w-[100%] md:w-[80%] mx-auto"
          alt="Logo"
        />
        <Typography.Text className="text-nj-orange font-medium text-[16rem] md:text-[40rem] leading-[1.5]">
          {t("nutritional_journey.campaign_name")}
        </Typography.Text>
      </div>
    </section>
  );
};
