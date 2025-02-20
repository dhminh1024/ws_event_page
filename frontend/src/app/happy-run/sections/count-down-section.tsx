import { HTMLAttributes, useEffect, useState, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import BackgroundImage from "@happy-run/assets/images/bg-count-down.png";
import Typography from "@/app/happy-box/components/typography";
import parser from "html-react-parser";
import { useLocales } from "@/core/hooks/use-locales";
import { PrimaryButton } from "@happy-run/components/button";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { differenceInDays, differenceInMinutes, format } from "date-fns";
import { getTimeLeft } from "@/lib/utils/common";
import { Link } from "react-router-dom";

export type CountDownSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const CountDownSection: FC<CountDownSectionProps> = ({ className }) => {
  const { t } = useLocales();
  const event = useEventPageContext();
  const defaultDate = "2025-02-15";
  const targetDate = event?.variables.happy_run_date?.value || defaultDate;
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section
      className={cn(
        "px-[10rem] py-[10rem] md:py-[40rem] text-center",
        className
      )}
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography.Heading
        level={2}
        className="text-white font-black text-[13rem] md:text-[35rem]"
      >
        {parser(t("happy_run.count_down_heading"))}
      </Typography.Heading>
      <Link to="order">
        <PrimaryButton className="h-auto p-[8rem_25rem]  md:p-[10rem_50rem] my-[10rem] md:my-[20rem]">
          <Typography.Text className="font-black text-[18rem] md:text-[35rem]">
            {t("happy_run.buttons.register_now")}
          </Typography.Text>
        </PrimaryButton>
      </Link>
      <Typography.Paragraph className="mb-0 text-[9rem] md:text-[25rem] text-white">
        Happy Run
      </Typography.Paragraph>
      <Typography.Paragraph className="text-[20rem] md:text-[65rem] tracking-[3rem] md:tracking-[8rem] font-bold text-hr-honey">
        {format(targetDate || new Date(), "dd-MM-yyyy")}
      </Typography.Paragraph>
      <span className="text-[40rem] "></span>
      <Typography.Paragraph className="text-[10rem] md:text-[28rem] text-white">
        {parser(
          t("happy_run.count_down_date", {
            day:
              timeLeft.days > 9
                ? timeLeft.days
                : `0${Math.max(timeLeft.days, 0)}`,
            hours:
              timeLeft.hours > 9
                ? timeLeft.hours
                : `0${Math.max(timeLeft.hours, 0)}`,
            minutes:
              timeLeft.minutes > 9
                ? timeLeft.minutes
                : `0${Math.max(0, timeLeft.minutes)}`,
            seconds:
              timeLeft.seconds > 9
                ? timeLeft.seconds
                : `0${Math.max(0, timeLeft.seconds)}`,
          })
        )}
      </Typography.Paragraph>
    </section>
  );
};
