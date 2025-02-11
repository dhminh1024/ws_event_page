import { use, useState, type FC } from "react";
import Typography from "@nutrition-journey/components/typography";
import { useLocales } from "@/core/hooks/use-locales";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

export type RewardSectionProps = {
  className?: string;
};

export const RewardSection: FC<RewardSectionProps> = ({ className }) => {
  const event = useEventPageContext();
  const { t, currentLanguage } = useLocales();

  return (
    <section className="relative">
      <div className="flex flex-col gap-y-[10rem]">
        <Typography.Heading
          level={2}
          className="font-normal text-[20rem] md:text-[28rem] text-nj-green  bg-nj-green/10 px-[20rem]"
        >
          {t("nutritional_journey.heading_3")}
        </Typography.Heading>
        <div className="flex flex-col gap-y-[10rem] pl-[5rem] md:pl-[20rem]">
          <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
            ☛ {event.variables.reward_1_vn?.value}
          </Typography.Text>
          <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
            ☛ {event.variables.reward_2_vn?.value}
          </Typography.Text>
          <Typography.Text className="text-nj-orange font-medium text-[14rem] md:text-[20rem]">
            ☛ {event.variables.reward_3_vn?.value}
          </Typography.Text>
        </div>
      </div>
    </section>
  );
};
