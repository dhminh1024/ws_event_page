import { HTMLAttributes, useMemo, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import ScheduleImage from "@greatest-show-25/assets/images/schedule.png";
import ScheduleMobileImage from "@greatest-show-25/assets/images/schedule-mb.png";
import Typography from "@/app/happy-box/components/typography";
import { useLocales } from "@/core/hooks/use-locales";
import parser from "html-react-parser";
import { use } from "i18next";

export type ScheduleProps = HTMLAttributes<HTMLDivElement> & {};

export const Schedule: FC<ScheduleProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();

  const scheduleData = useMemo(
    () => [
      {
        heading: t("greatest_show_25.form.pharse_1_heading"),
        desc: t("greatest_show_25.form.pharse_1_desc"),
      },
      {
        heading: t("greatest_show_25.form.pharse_2_heading"),
        desc: t("greatest_show_25.form.pharse_2_desc"),
      },
      {
        heading: t("greatest_show_25.form.pharse_3_heading"),
        desc: t("greatest_show_25.form.pharse_3_desc"),
      },
      {
        heading: t("greatest_show_25.form.pharse_4_heading"),
        desc: t("greatest_show_25.form.pharse_4_desc"),
      },
    ],
    [currentLanguage]
  );

  return (
    <div className={cn("relative", className)}>
      <img src={ScheduleImage} className="hidden md:block" alt="Schedule" />
      <img
        src={ScheduleMobileImage}
        alt="Schedule"
        className="md:hidden w-full"
      />
      <div className="absolute w-full h-full bottom-[0] left-0">
        <div
          className={cn(
            "flex flex-col h-full items-end py-[3%] gap-y-[4%]",
            "md:grid md:grid-cols-4 md:gap-[4%] md:py-0 md:px-[1.7%]"
          )}
        >
          {scheduleData.map((item, index) => (
            <div
              className="flex flex-col h-[130rem] w-[155rem] p-[4%] md:h-[40%] md:w-full md:pb-[16rem] justify-between items-start md:items-center md:text-center"
              key={index}
            >
              <Typography.Heading
                level={2}
                className="md:text-center text-[13rem] md:text-[26rem] text-gs25-primary font-extrabold leading-[15rem] md:leading-[30rem] uppercase"
              >
                {parser(item.heading)}
              </Typography.Heading>
              <Typography.Paragraph className="md:text-center text-[12rem] md:text-[20rem]">
                {parser(item.desc)}
              </Typography.Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
