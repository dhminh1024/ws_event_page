import {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
  memo,
  type FC,
  useRef,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@atoms/dialog";
import Typography from "./typography";
import { useLocales } from "@/core/hooks/use-locales";
import parser from "html-react-parser";
import RegisterSuccessHeading from "@greatest-show-25/assets/images/registration-success-heading.png";
import SuccessFooterImage from "@greatest-show-25/assets/images/success-footer.png";
import { getTimeLeft } from "@/lib/utils/common";
import Counter from "@atoms/counter";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { format } from "date-fns";

export type ProgramStatusModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean;
    type?: "not_opened" | "expired";
    openedDatetime?: Date;
    onClose?: () => void;
  };

const ProgramStatusModalComponent: FC<ProgramStatusModalProps> = ({
  open: $open = false,
  className,
  type,
  openedDatetime,
  onClose,
}) => {
  const { t } = useLocales();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(openedDatetime));

  useEffect(() => {
    setIsOpen($open);
  }, [$open]);

  useEffect(() => {
    // Create timer (only once on mount)
    if (openedDatetime && !timerRef.current) {
      timerRef.current = setInterval(() => {
        const newTimeLeft = getTimeLeft(openedDatetime || "");
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
    }

    // Cleanup function (only on unmount)
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [openedDatetime]);

  console.log(openedDatetime, timeLeft);

  const handleOpenChange = (open: boolean) => {
    if (!open) return;
    setIsOpen(open);
    if (!open) {
      onClose?.();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[700px] w-full bg-hr-background border-none shadow-none p-0",
          className
        )}
      >
        <DialogTitle hidden></DialogTitle>
        <DialogDescription hidden></DialogDescription>

        <div className="px-[2%]">
          <center className="mb-20">
            {type === "not_opened" && (
              <>
                <Typography.Heading
                  className="text-[16rem] md:text-[24rem] text-gs25-primary leading-loose font-base mt-100 mb-40 font-extrabold uppercase"
                  level={2}
                >
                  {parser(
                    t("greatest_show_25.program_status.not_opened_title")
                  )}
                </Typography.Heading>
                {openedDatetime && (
                  <>
                    <div className="flex justify-center items-end gap-0 md:gap-20">
                      <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
                        {t("greatest_show_25.count_down_text_prefix")}
                      </span>
                      <Counter
                        value={timeLeft.days}
                        fontSize={isDesktop ? "30rem" : "14rem"}
                        gap={isDesktop ? 8 : 0}
                        textColor="#8c28ff"
                        places={[10, 1]}
                      />
                      <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
                        {t("greatest_show_25.count_down_text_days")}
                      </span>
                      <Counter
                        value={timeLeft.hours}
                        fontSize={isDesktop ? "30rem" : "14rem"}
                        gap={isDesktop ? 8 : 0}
                        textColor="#8c28ff"
                        places={[10, 1]}
                      />
                      <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
                        {t("greatest_show_25.count_down_text_hours")}
                      </span>
                      <Counter
                        value={timeLeft.minutes}
                        fontSize={isDesktop ? "30rem" : "14rem"}
                        gap={isDesktop ? 8 : 0}
                        textColor="#8c28ff"
                        places={[10, 1]}
                      />
                      <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
                        {t("greatest_show_25.count_down_text_minutes")}
                      </span>
                      <Counter
                        value={timeLeft.seconds}
                        fontSize={isDesktop ? "30rem" : "14rem"}
                        gap={isDesktop ? 8 : 0}
                        textColor="#8c28ff"
                        places={[10, 1]}
                      />
                      <span className="text-[10rem] leading-40 md:leading-80 md:text-[20rem]">
                        {t("greatest_show_25.count_down_text_seconds")}
                      </span>
                    </div>

                    <Typography.Heading
                      className="text-[12rem] md:text-[18rem] text-gs-primary leading-loose font-base mt-40"
                      level={3}
                    >
                      {parser(
                        t(
                          "greatest_show_25.program_status.not_opened_message",
                          {
                            date: format(openedDatetime, "HH:mm, dd/MM/yyyy"),
                          }
                        )
                      )}
                    </Typography.Heading>
                  </>
                )}
              </>
            )}

            {type === "expired" && (
              <>
                <Typography.Heading
                  className="text-[16rem] md:text-[24rem] text-gs25-primary leading-loose font-base mt-100 mb-40 font-extrabold uppercase"
                  level={2}
                >
                  {parser(t("greatest_show_25.program_status.expired_title"))}
                </Typography.Heading>

                <Typography.Heading
                  className="text-[14rem] md:text-[18rem] text-gs-primary leading-loose font-base"
                  level={3}
                >
                  {parser(t("greatest_show_25.program_status.expired_message"))}
                </Typography.Heading>
              </>
            )}
          </center>
        </div>
        <img className="w-full" src={SuccessFooterImage} alt="Footer" />
      </DialogContent>
    </Dialog>
  );
};

// Memoize the component to prevent unnecessary re-renders
// The modal only re-renders when its props change (type, openedDatetime, etc)
// Internal countdown state changes won't trigger parent component re-renders
ProgramStatusModalComponent.displayName = "ProgramStatusModal";
export const ProgramStatusModal = memo(ProgramStatusModalComponent);
