import {
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import BackgroundImage from "../assets/images/bg-countdown.webp";
import Typography from "@/app/happy-box/components/typography";
import parser from "html-react-parser";
import { useLocales } from "@/core/hooks/use-locales";
import { PrimaryButton } from "../components/button";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { differenceInDays, differenceInMinutes, format } from "date-fns";
import { getTimeLeft, parseDate } from "@/lib/utils/common";
import { Link } from "react-router-dom";
import Counter from "@atoms/counter";
import { useResponsive } from "@/core/hooks/use-reponsive";

export type CountDownSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const CountDownSection: FC<CountDownSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const event = useEventPageContext();
  const defaultDate = "2025-11-23 17:00";
  const targetDate = useMemo(
    () => event?.variables.countdown_date?.value || defaultDate,
    [event?.variables.countdown_date?.value]
  );
  const [timeLeft, setTimeLeft] = useState(
    getTimeLeft(parseDate(targetDate, "yyyy-MM-dd HH:mm"))
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const targetDateRef = useRef(targetDate);

  // Update ref when targetDate changes
  useEffect(() => {
    targetDateRef.current = targetDate;
  }, [targetDate]);

  useEffect(() => {
    // Create timer (only once on mount)
    timerRef.current = setInterval(() => {
      const newTimeLeft = getTimeLeft(
        parseDate(targetDateRef.current, "yyyy-MM-dd HH:mm")
      );
      setTimeLeft(newTimeLeft);
      console.log(newTimeLeft);

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
        className="text-brand-honey text-[13rem] md:text-[35rem]"
      >
        {parser(
          event.variables[`countdown_text_${currentLanguage}`]?.value || ""
        )}
      </Typography.Heading>
      <Typography.Paragraph className="text-[20rem] md:text-[55rem] tracking-[3rem] md:tracking-[8rem] font-bold text-white">
        {format(targetDate || new Date(), "dd-MM-yyyy")}
      </Typography.Paragraph>
      <span className="text-[40rem] "></span>
      <div className="text-[10rem] md:text-[28rem] text-white">
        <div className="flex justify-center items-end gap-0 md:gap-20">
          <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
            {t("greatest_show_25.count_down_text_prefix")}
          </span>
          <Counter
            value={timeLeft.days}
            fontSize={isDesktop ? "44rem" : "14rem"}
            gap={isDesktop ? 8 : 0}
            places={[10, 1]}
          />
          <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
            {t("greatest_show_25.count_down_text_days")}
          </span>
          <Counter
            value={timeLeft.hours}
            fontSize={isDesktop ? "44rem" : "14rem"}
            gap={isDesktop ? 8 : 0}
            places={[10, 1]}
          />
          <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
            {t("greatest_show_25.count_down_text_hours")}
          </span>
          <Counter
            value={timeLeft.minutes}
            fontSize={isDesktop ? "44rem" : "14rem"}
            gap={isDesktop ? 8 : 0}
            places={[10, 1]}
          />
          <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
            {t("greatest_show_25.count_down_text_minutes")}
          </span>
          <Counter
            value={timeLeft.seconds}
            fontSize={isDesktop ? "44rem" : "14rem"}
            gap={isDesktop ? 8 : 0}
            places={[10, 1]}
          />
          <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
            {t("greatest_show_25.count_down_text_seconds")}
          </span>
        </div>
      </div>
      {event?.variables[`countdown_button_text_${currentLanguage}`]?.value && (
        <Link to={event?.variables.countdown_url_redirect?.value || "/"} target="_blank">
          <PrimaryButton className="h-auto p-[8rem_25rem] md:p-[35rem_50rem] my-40 md:my-80">
            <Typography.Text className="font-black text-[12rem] md:text-[35rem]">
              {
                event?.variables[`countdown_button_text_${currentLanguage}`]
                  ?.value
              }
            </Typography.Text>
          </PrimaryButton>
        </Link>
      )}
    </section>
  );
};
