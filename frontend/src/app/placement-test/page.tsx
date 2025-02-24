import { useLocales } from "@/core/hooks/use-locales";
import { useNavigate, useParams } from "react-router-dom";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { cleanPath, getDateLocale } from "@/lib/utils/common";
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
import { HouseSimple, User } from "phosphor-react";
import { log } from "console";

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
      padding: 25px;
      font-size: 15px;
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
  const params = useParams();
  const event = useEventPageContext();

  const { settings } = usePTSettings();

  const { id: bookingID } = params;
  const { lead, error: getLeadError, mutate } = useGetLeadByBookingID(
    bookingID,
    !bookingID
  );

  const { testSlots, error: getTestSlotsError } = useGetAllTestSlots(
    bookingID,
    !bookingID
  );

  const dayGroupBy = testSlots?.reduce<Record<string, boolean>>((arr, slot) => {
    const day = format(slot.date, "dd/MM");
    arr[day] = true;
    return arr;
  }, {});

  const { register } = useRegisterTestSlot();
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [slotSelected, setSlotSelected] = useState<string | null>();

  useEffect(() => {
    if (lead?.registered_slot) {
      console.log("SET SLOT", lead?.registered_slot);

      setSlotSelected(lead?.registered_slot);
    }
  }, [lead]);

  console.log("GROUP BY", dayGroupBy);

  console.log("Settings", settings);
  console.log(lead, getLeadError);
  console.log(testSlots, getTestSlotsError);

  const handleSubmit = async () => {
    if (slotSelected) {
      await register({
        lead_id: lead?.name,
        test_slot_id: slotSelected,
        booking_id: bookingID,
        switch_slot: lead?.registered_slot ? true : false,
        send_email: false,
      });
      alert("SUCCESS");
      mutate()
    }
  };

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
    <div className="bg-pt-background h-[100vh] overflow-x-hidden p-5">
      <div className="flex justify-center items-center h-full">
        <div className="w-full md:w-[1024px] m-auto">
          <div className="flex items-center justify-end mb-2">
            <span className="text-sm text-pt-blue">
              {t("common.language")}:
            </span>
            <LanguageSwitcher className="ml-2 w-6 h-4 !bg-transparent" />
          </div>
          <div className=" bg-white rounded-lg overflow-hidden">
            {!settings?.open_test_registration ||
              (settings.test_registration_closing_time &&
                differenceInMinutes(
                  new Date(settings.test_registration_closing_time),
                  new Date()
                ) < 0 && (
                  <div className="text-center p-5 text-red-500">
                    {t("placement_test.registration_closed")}
                  </div>
                ))}
            <div className="flex flex-col md:flex-row items-stretch h-full w-full">
              <div className="md:flex-1 p-5 h-full text-hr-primary">
                <div className="h-full flex flex-col justify-between">
                  <div className="">
                    <p className="text-2xl font-extrabold ">
                      {lead?.registration_number}
                    </p>
                    <p className="flex items-center gap-x-2 mt-2">
                      <User className="text-pt-ember" size={16} />
                      <span>
                        {t("common.full_name")}:
                        <span className="font-semibold ml-1">
                          {lead?.student_full_name}
                        </span>
                      </span>
                    </p>
                    <p className="flex items-center gap-x-2 mt-2">
                      <HouseSimple className="text-pt-ember" size={16} />
                      <span>
                        {t("common.class")}:
                        <span className="font-semibold ml-1">
                          {lead?.student_grade}
                        </span>
                      </span>
                    </p>
                  </div>
                  <p className="hidden md:block  mt-5">
                    <img
                      className="h-[100px] w-auto md:w-[90%] md:mx-auto"
                      src={cleanPath(`${env.ASSET_URL}/${lead?.qr_code}`)}
                      alt=""
                    />
                  </p>
                </div>
              </div>
              <div className="basis-[450px] border-l-transparent border-r-transparent md:border-l-pt-primary/20 md:border-r-pt-primary/20 border-t-transparent md:border-t-transparent md:border-b-transparent border-[1px]">
                <CalendarStyled
                  mode="single"
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
              </div>
              <div className="md:basis-[25%] p-5 h-full">
                <p className="font-bold text-pt-primary mb-5">
                  <span className="text-xl mr-2 text-pt-ember">
                    {dateSelected &&
                      format(dateSelected, "EEEE", {
                        locale: getDateLocale(currentLanguage),
                      })}
                  </span>
                  <span className="opacity-80 text-sm">
                    {dateSelected &&
                      format(dateSelected, "dd MMMM yyyy", {
                        locale: getDateLocale(currentLanguage),
                      })}
                  </span>
                </p>
                <div className="flex flex-col gap-2">
                  {testSlots
                    ?.filter(
                      (slot) =>
                        format(slot.date, "yyyy-MM-dd") ===
                        format(dateSelected, "yyyy-MM-dd")
                    )
                    .sort((a, b) => {
                      return (
                        new Date("2025-01-01 " + a.start_time).getHours() -
                        new Date("2025-01-01 " + b.start_time).getHours()
                      );
                    })
                    .map((slot) => (
                      <Button
                        key={slot.name}
                        className={cn(
                          "text-pt-primary border-pt-primary bg-pt-background/20 hover:bg-slate-200 hover:text-pt-primary",
                          {
                            "!bg-pt-primary !text-white":
                              slot.name === slotSelected,
                          }
                        )}
                        variant="outline"
                        onClick={() => setSlotSelected(slot.name)}
                      >
                        {slot.start_time} - {slot.end_time}
                      </Button>
                    ))}
                </div>
                <Button
                  className="w-full mt-5"
                  onClick={handleSubmit}
                  disabled={
                    lead?.registered_slot === slotSelected || !slotSelected
                  }
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Component.displayName = "Placement Test Registration";
