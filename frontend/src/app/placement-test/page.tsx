import { useLocales } from "@/core/hooks/use-locales";
import { useNavigate, useParams } from "react-router-dom";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDateLocale } from "@/lib/utils/common";
import { DayContentProps } from "react-day-picker";
import { cn } from "@/core/utils/shadcn-utils";
import { format } from "date-fns";
import { Button } from "@atoms/button";
import { Calendar } from "@atoms/calendar";
import { LanguageSwitcher } from "@features/preferences/language-switcher";
import useGetLeadByBookingID from "./api/use-get-lead-by-booking-id";
import useGetAllTestSlots from "./api/use-get-all-test-slots";
import useRegisterTestSlot from "./api/use-register-test-slot";
import { usePTSettings } from "./context/use-pt-settings";

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
  const [dateSelected, setDateSelected] = useState<Date>(new Date());

  const { settings } = usePTSettings();

  const { id: bookingID } = params;
  const { lead, error: getLeadError } = useGetLeadByBookingID(
    bookingID,
    !bookingID
  );

  const { testSlots, error: getTestSlotsError } = useGetAllTestSlots(
    bookingID,
    !bookingID
  );

  console.log("Settings", settings);

  const { register } = useRegisterTestSlot();

  console.log(lead, getLeadError);
  console.log(testSlots, getTestSlotsError);

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
    <div className="bg-pt-background h-[100vh] overflow-x-hidden">
      <div className="flex justify-center items-center h-full">
        <div className="w-full lg:w-[1024px] m-auto">
          <div className="flex items-center justify-end mb-2">
            <span className="text-sm text-pt-blue">
              {t("common.language")}:{" "}
            </span>
            <LanguageSwitcher className="ml-2 w-6 h-4 !bg-transparent" />
          </div>
          <div className=" bg-white rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row h-full w-full">
              <div className="lg:flex-1 bg-slate-400 min-h-[200px] h-full"></div>
              <div className="basis-[450px] border-l-transparent border-r-transparent lg:border-l-pt-primary/20 lg:border-r-pt-primary/20 border-t-transparent lg:border-t-transparent lg:border-b-transparent border-[1px]">
                <CalendarStyled
                  mode="single"
                  fromDate={new Date(2025, 1, 24)}
                  toDate={new Date(2025, 1, 28)}
                  locale={getDateLocale(currentLanguage)}
                  components={{
                    DayContent: (props) => <CustomDayContent {...props} />,
                  }}
                  className="rounded-md py-10 border-none w-full border text-hr-primary"
                  selected={dateSelected}
                  onSelect={(date) => date && setDateSelected(date)}
                />
              </div>
              <div className="lg:basis-[25%] p-5 h-full">
                <p className="font-bold text-pt-primary mb-5">
                  <span className="text-xl mr-2 text-pt-ember">
                    {dateSelected &&
                      format(dateSelected, "EEEE", {
                        locale: getDateLocale(currentLanguage),
                      })}
                  </span>
                  <span className="opacity-80 text-sm">
                    {dateSelected &&
                      format(dateSelected, "PP", {
                        locale: getDateLocale(currentLanguage),
                      })}
                  </span>
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    className="text-pt-primary border-pt-primary bg-pt-background/20 hover:bg-pt-primary"
                    variant="outline"
                  >
                    09:00 AM
                  </Button>
                  <Button
                    className="text-pt-primary border-pt-primary bg-pt-background/20 hover:bg-pt-primary"
                    variant="outline"
                  >
                    10:00 AM
                  </Button>
                  <Button
                    className="text-pt-primary border-pt-primary bg-pt-background/20 hover:bg-pt-primary"
                    variant="outline"
                  >
                    11:00 AM
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Component.displayName = "Placement Test Registration";
