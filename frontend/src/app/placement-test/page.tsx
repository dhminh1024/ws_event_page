import { useLocales } from "@/core/hooks/use-locales";
import { useNavigate, useParams } from "react-router-dom";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { ReactNode, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { cleanPath, getDateLocale, parseDate } from "@/lib/utils/common";
import { DayContentProps } from "react-day-picker";
import { cn } from "@/core/utils/shadcn-utils";
import { differenceInMinutes, format } from "date-fns";
import { Button } from "@atoms/button";
import { Calendar } from "@atoms/calendar";
import { LanguageSwitcher } from "@features/preferences/language-switcher";
import useGetLeadByBookingID from "./api/use-get-lead-by-booking-id";
import useGetAllTestSlots from "./api/use-get-all-test-slots";
import useRegisterTestSlot from "./api/use-register-test-slot";
import { usePTSettings } from "./context/use-pt-settings";
import env from "@/config/env";
import { HouseSimple, ListNumbers, User } from "phosphor-react";
import { log } from "console";
import { WSEACTestSlot } from "@/types/WellspringEventPage/WSEACTestSlot";
import { Check, Loader2 } from "lucide-react";
import ConfirmModal from "./components/confirm-modal";
import BannerTopPC from "./assets/images/banner-top-pc.jpg";
import BannerTopMB from "./assets/images/banner-top-mb.jpg";
import { useResponsive } from "@/core/hooks/use-reponsive";
import parser from "html-react-parser";
import { Separator } from "@radix-ui/react-select";
import { ModalProps, NotificationModal } from "./components/notification-modal";
import { FrappeError } from "frappe-react-sdk";
import { parse } from "path";

const CalendarStyled = styled(Calendar)`
  & > div,
  & > div > div {
    width: 100%;
  }
  & table {
    margin-top: 40px !important;
    .rdp-head tr,
    .rdp-tbody tr {
      justify-content: space-around;
    }
    tr [role="gridcell"] {
      width: 50px;
      height: 50px;
    }
    button {
      padding: 20px;
      font-size: 13px;
    }
  }
`;

type DayCalendarProps = DayContentProps & {};

export function CustomDayContent(props: DayCalendarProps) {
  return (
    <div className={cn("relative")}>
      {props.date.getDate()}
      {props.date.toDateString() === new Date().toDateString() && (
        <div
          className={cn(
            "absolute left-0 right-0 m-auto bottom-[-5px] dot w-1 h-1 bg-pt-ember rounded-full mx-auto",
            {
              "bg-white": props.activeModifiers.selected,
            }
          )}
        ></div>
      )}
    </div>
  );
}

export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const params = useParams();
  const event = useEventPageContext();
  const { settings } = usePTSettings();
  const { id: bookingID } = params;
  const {
    lead,
    error: getLeadError,
    mutate,
  } = useGetLeadByBookingID(bookingID, !bookingID);
  const {
    testSlots,
    error: getTestSlotsError,
    mutate: mutateSlots,
  } = useGetAllTestSlots(bookingID, !bookingID);
  const dayGroupBy = testSlots?.reduce<Record<string, boolean>>((arr, slot) => {
    const day = format(parseDate(slot.date, "yyyy-MM-dd"), "dd/MM");
    arr[day] = true;
    return arr;
  }, {});

  const { register, loading } = useRegisterTestSlot();
  const [dateSelected, setDateSelected] = useState<Date>();
  const [slotSelected, setSlotSelected] = useState<string | null>();
  const [message, setMessage] = useState<{
    type?: ModalProps["type"];
    title: string;
    message: ReactNode;
  }>();

  const isOpenRegistration = !settings?.is_registration_closed;

  const currentSlot: WSEACTestSlot | null =
    (lead?.registered_slot &&
      testSlots?.find((slot) => slot.name === lead?.registered_slot)) ||
    null;

  useEffect(() => {
    if (lead?.registered_slot && !dateSelected) {
      // console.log("SET SLOT", lead?.registered_slot);
      setDateSelected(
        currentSlot?.date ? new Date(currentSlot?.date) : undefined
      );
      setSlotSelected(lead?.registered_slot);
    } else if (!dateSelected) {
      // console.log("SET FIRST SLOT", testSlots?.[0].name);
      setDateSelected(
        testSlots?.[0].date ? new Date(testSlots?.[0].date) : undefined
      );
      setSlotSelected(testSlots?.[0].name);
    }
  }, [lead, dateSelected, testSlots, currentSlot]);

  // console.log("GROUP BY", dayGroupBy);

  // console.log("Settings", settings);
  // console.log(lead, getLeadError);
  // console.log(testSlots, getTestSlotsError);

  const handleSubmit = async () => {
    if (slotSelected && isOpenRegistration) {
      try {
        await register({
          lead_id: lead?.name,
          test_slot_id: slotSelected,
          booking_id: bookingID,
          switch_slot: lead?.registered_slot ? 1 : 0,
        });
        // alert("SUCCESS");
        setMessage({
          title: t("placement_test.registration_success.title"),
          message: parser(
            t("placement_test.registration_success.message", {
              email: lead?.contact_email,
            })
          ),
        });
      } catch (error: any) {
        if (error.exception.includes("WSEAC-E205")) {
          setMessage({
            type: "error",
            title: t("placement_test.registration_max_capacity.title"),
            message: t("placement_test.registration_max_capacity.message"),
          });
        } else {
          setMessage({
            type: "error",
            title: t("placement_test.registration_failed.title"),
            message: t("placement_test.registration_failed.message"),
          });
        }
      }
      mutate();
      mutateSlots();
    }
  };

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [setMessage])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(event.variables);

  // Rules
  // settings.open_test_registration must be 1
  // settings.test_registration_closing_time, e.g. "2025-02-27 16:11:49" must be greater than current time
  // bookingID must be valid, or lead must be valid
  // lead.registered_slot empty means user has not registered for a slot and vice versa
  // testSlots must have at least one slot
  // register() must be called with the correct parameters
  //    - lead_id (lead.name)
  //    - test_slot_id (testSlots[i].name)
  //    - booking_id (bookingID)
  //    - switch_slot: True if edit previous submission else False
  //    - send_email: True will send a confirmation email to the user

  return (
    <div className="bg-pt-background h-screen overflow-x-hidden p-5">
      <div className="flex justify-center items-center h-full">
        <div className="w-full md:w-[1136px] m-auto">
          <div className="flex items-center justify-end mb-2">
            <span className="text-sm text-pt-blue">
              {t("common.language")}:
            </span>
            <LanguageSwitcher className="ml-2 w-6 h-4 bg-transparent!" />
          </div>
          <div className=" bg-white rounded-lg overflow-hidden mb-10">
            {isDesktop && <img src={BannerTopPC} alt="Banner Top" />}
            {!isDesktop && <img src={BannerTopMB} alt="Banner Top" />}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_25%] items-stretch h-full w-full">
              <div className="col-span-1 md:flex-1 p-5 h-full text-hr-primary">
                <div className="h-full flex flex-col justify-between">
                  <div className="">
                    <p className="text-xl font-extrabold ">
                      {t("placement_test.registration_title")}
                    </p>
                    <p className="text-md font-semibold "></p>

                    <p className="text-sm flex items-center gap-x-2 mt-2">
                      <User className="text-pt-ember" size={16} />
                      <span>
                        {t("common.full_name")}:
                        <span className="font-semibold ml-1">
                          {lead?.student_full_name}
                        </span>
                      </span>
                    </p>
                    <p className="text-sm flex items-center gap-x-2 mt-2">
                      <HouseSimple className="text-pt-ember" size={16} />
                      <span>
                        {t("common.class")}:
                        <span className="font-semibold ml-1">
                          {lead?.student_grade}
                        </span>
                      </span>
                    </p>
                    <p className="text-sm flex items-center gap-x-2 mt-2">
                      <ListNumbers className="text-pt-ember" size={16} />
                      <span>
                        {t("placement_test.registration_number")}:
                        <span className="font-semibold ml-1">
                          {lead?.registration_number}
                        </span>
                      </span>
                    </p>
                  </div>
                  {currentSlot && (
                    <div className="mt-2 text-center">
                      <p className="text-md md:text-xl">
                        {t("placement_test.registered_slot")}:
                      </p>
                      <p className="text-md md:text-xl font-bold flex items-center gap-x-2 justify-center">
                        {format(
                          parseDate(currentSlot?.date, "yyyy-MM-dd"),
                          "EEEE, dd/MM/yyyy",
                          { locale: getDateLocale(currentLanguage) }
                        ) +
                          " | " +
                          format(
                            parseDate("2025-01-01 " + currentSlot.start_time),
                            "HH:mm"
                          )}
                        <Check className="text-green-500 w-5 h-5 inline" />
                      </p>
                    </div>
                  )}
                  {/* <p className="mt-5 md:mt-5">
                    <p className="text-center italic text-sm">
                      Check In QR Code
                    </p>
                    <img
                      className="h-[100px] w-auto md:h-auto md:w-[40%] mx-auto"
                      src={lead?.qr_code}
                      alt=""
                    />
                  </p> */}

                  {/* <p className="mt-5 text-sm italics text-pt-ember">
                    {event.variables?.[`notice_${currentLanguage}`]?.value}
                  </p> */}
                </div>
              </div>
              <div className="w-full md:w-[480px] border-l-transparent border-r-transparent md:border-l-pt-primary/20 md:border-r-pt-primary/20 border-t-pt-primary/20 border-b-pt-primary/20 md:border-t-transparent md:border-b-transparent border">
                {useMemo(
                  () => (
                    <CalendarStyled
                      key={testSlots?.[0].name}
                      mode="single"
                      defaultMonth={
                        testSlots?.[0].date
                          ? new Date(testSlots[0].date)
                          : new Date()
                      }
                      disabled={(date) =>
                        !Object.keys(dayGroupBy || {})?.includes(
                          format(date, "dd/MM").toString()
                        )
                      }
                      showOutsideDays={false}
                      locale={getDateLocale(currentLanguage)}
                      components={{
                        DayContent: (props) => <CustomDayContent {...props} />,
                      }}
                      className="rounded-md py-10 border-none w-full border text-hr-primary"
                      selected={dateSelected}
                      onSelect={(date) => date && setDateSelected(date)}
                    />
                  ),
                  [testSlots, dateSelected, currentLanguage, dayGroupBy]
                )}
              </div>
              <div className="p-5 h-full">
                {dateSelected && (
                  <div className="h-full flex flex-col justify-between">
                    <div className="">
                      <p className="font-bold text-pt-primary mb-5">
                        <span className="text-md md:text-xl mr-2 text-pt-ember">
                          {dateSelected &&
                            format(dateSelected, "EEEE", {
                              locale: getDateLocale(currentLanguage),
                            })}
                        </span>
                        <span className="opacity-80 text-sm">
                          {dateSelected &&
                            format(dateSelected, "dd MMM yyyy", {
                              locale: getDateLocale(currentLanguage),
                            })}
                        </span>
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm text-hr-primary/80">
                          <span>{t("placement_test.time_slots")}</span>
                          <span>{t("placement_test.capacity")}</span>
                        </div>
                        {testSlots
                          ?.filter(
                            (slot) =>
                              dateSelected &&
                              format(
                                parseDate(slot.date, "yyyy-MM-dd"),
                                "yyyy-MM-dd"
                              ) === format(dateSelected, "yyyy-MM-dd")
                          )
                          // .sort((a, b) => {
                          //   return (
                          //     new Date("2025-01-01 " + a.start_time).getHours() -
                          //     new Date("2025-01-01 " + b.start_time).getHours()
                          //   );
                          // })
                          .map((slot) => (
                            <Button
                              key={slot.name}
                              className={cn(
                                "text-pt-primary border-pt-primary bg-pt-background/20 hover:bg-slate-200 hover:text-pt-primary flex justify-between",
                                {
                                  "bg-pt-primary! text-white!":
                                    slot.name === slotSelected,
                                },
                                {
                                  "opacity-50":
                                    slot.current_registered ===
                                    slot.max_capacity,
                                }
                              )}
                              disabled={
                                slot.current_registered === slot.max_capacity
                              }
                              variant="outline"
                              onClick={() => setSlotSelected(slot.name)}
                            >
                              <span>
                                {format(
                                  parseDate("2025-01-01 " + slot.start_time),
                                  "HH:mm"
                                )}{" "}
                                -{" "}
                                {format(
                                  parseDate("2025-01-01 " + slot.end_time),
                                  "HH:mm"
                                )}
                              </span>
                              <span>{`${slot.current_registered}/${slot.max_capacity}`}</span>
                            </Button>
                          ))}
                      </div>
                      <div className="w-full mt-5">
                        {!isOpenRegistration && (
                          <p className="text-sm italic text-destructive mb-1">
                            {t("placement_test.registration_closed")}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleSubmit}
                      disabled={
                        !isOpenRegistration ||
                        lead?.registered_slot === slotSelected ||
                        !slotSelected ||
                        loading
                      }
                    >
                      {loading && (
                        <Loader2 className="mr-2 animate-spin w-4 h-4 text-white" />
                      )}
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="h-px bg-pt-primary/20 w-full"></div>
            <span className="ml-2 hidden"></span>
            <div className="my-2 ml-5 pr-5 text-sm text-pt-primary">
              {parser(
                event.variables?.[`footer_text_${currentLanguage}`]?.value || ""
              )}
            </div>
          </div>
        </div>
      </div>
      <NotificationModal
        open={!!message}
        type={message?.type}
        title={message?.title}
        description={message?.message}
        onClosed={() => setMessage(undefined)}
      />
    </div>
  );
};

Component.displayName = "Placement Test Registration";
