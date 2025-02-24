import { useLocales } from "@/core/hooks/use-locales";
import { useNavigate, useParams } from "react-router-dom";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useEffect } from "react";
import Typography from "./components/typography";
import { Calendar } from "@atoms/calendar";
import useGetLeadByBookingID from "./api/use-get-lead-by-booking-id";
import useGetAllTestSlots from "./api/use-get-all-test-slots";
import useRegisterTestSlot from "./api/use-register-test-slot";
import { usePTSettings } from "./context/use-pt-settings";

export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const params = useParams();
  const event = useEventPageContext();

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
    <div className="bg-pt-background overflow-hidden h-[100vh]">
      <div className="flex justify-center items-center h-full">
        <div className="max-w-[90%] w-[1136px] h-[90vh] m-auto bg-white rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row h-full w-full">
            <div className="basis-[25%] bg-slate-400"></div>
            <div className="basis-[50%] bg-slate-200">
              <Calendar
                mode="single"
                // selected={date}
                // onSelect={setDate}
                className="rounded-md w-full border text-hr-primary"
              />
            </div>
            <div className="basis-[25%] bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

Component.displayName = "Placement Test Registration";
