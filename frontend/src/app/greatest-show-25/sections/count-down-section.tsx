import { HTMLAttributes, useEffect, useMemo, useRef, useState, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import BackgroundImage from "../assets/images/bg-countdown.png";
import Typography from "@/app/happy-box/components/typography";
import parser from "html-react-parser";
import { useLocales } from "@/core/hooks/use-locales";
import { PrimaryButton } from "../components/button";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { differenceInDays, differenceInMinutes, format } from "date-fns";
import { getTimeLeft } from "@/lib/utils/common";
import { Link } from "react-router-dom";

export type CountDownSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const CountDownSection: FC<CountDownSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  const defaultDate = "2025-02-15";
  const targetDate = useMemo(
    () => event?.variables.countdown_date?.value || defaultDate,
    [event?.variables.countdown_date?.value]
  );
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const targetDateRef = useRef(targetDate);

  // Update ref when targetDate changes
  useEffect(() => {
    targetDateRef.current = targetDate;
  }, [targetDate]);

  useEffect(() => {
    // Create timer (only once on mount)
    timerRef.current = setInterval(() => {
      const newTimeLeft = getTimeLeft(targetDateRef.current);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }, 1000);

    // Cleanup function (only on unmount)
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once

  // console.log(timeLeft);
  

  return (
    <section
      className={cn("px-40 py-40 md:py-160 text-center", className)}
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography.Heading
        level={2}
        className="text-white text-[13rem] md:text-[35rem]"
      >
        {parser(event.variables[`countdown_text_${currentLanguage}`]?.value || "")}
      </Typography.Heading>
      <Typography.Paragraph className="text-[20rem] md:text-[55rem] tracking-[3rem] md:tracking-[8rem] font-bold text-white">
        {format(targetDate || new Date(), "dd-MM-yyyy")}
      </Typography.Paragraph>
      <span className="text-[40rem] "></span>
      <div className="text-[10rem] md:text-[28rem] text-white">
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
      </div>
      <Link to="order">
        <PrimaryButton className="h-auto p-[8rem_25rem] md:p-[35rem_50rem] my-40 md:my-80">
          <Typography.Text className="font-black text-[12rem] md:text-[35rem]">
            {t("happy_run.buttons.register_now")}
          </Typography.Text>
        </PrimaryButton>
      </Link>
    </section>
  );
};
