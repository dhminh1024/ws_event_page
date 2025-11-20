import { lazy, PropsWithChildren, Suspense, useMemo, useState } from "react";
import { Button } from "@atoms/button";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useGetCertificate } from "../api/use-get-certificate";
import { Certificate } from "../components/certificate";
import { parseDate } from "@/core/utils/common";
import { useSearchParams } from "react-router-dom";
import { useTrackPageVisit } from "../api/use-track-page-visit";
import { useListEvents } from "../api/use-list-events";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventVisit } from "../api/use-event-visit";
import { Kv } from "../components/kv";
import { LanguageSelector } from "../components/language-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@atoms/select";

const CertificateModal = lazy(() =>
  import("@/app/kindergarten-demo-day/components/certificate-modal").then(
    (module) => ({
      default: module.CertificateModal,
    })
  )
);

const WelcomePage = () => {
  const events = useEventPageContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const eventName = searchParams.get("event") || undefined;
  const token = searchParams.get("certificate_token") || undefined;
  const [eventSelected, setEventSelected] = useState<string | null>(null);

  // Fetch list of events (only when eventName is not provided)
  const { events: eventsList, isLoading: isLoadingEvents } = useListEvents(
    { registration_open: "1" }, // Only show events with registration open
    !eventName // Only fetch when no eventName is provided
  );

  const { eventVisit } = useEventVisit(eventName || "");

  // Track page visit automatically (only when eventName is provided)
  useTrackPageVisit(eventName);

  // Fetch certificate data using the token
  const { certificate, isSuccess } = useGetCertificate(token);

  // Handler to set event when user clicks on an event card
  const handleEventSelect = (selectedEventName: string) => {
    setSearchParams({ event: selectedEventName });
  };

  // If certificate token is provided and certificate is loaded, show certificate
  if (isSuccess && certificate?.student_name) {
    return (
      <Certificate
        studentName={certificate?.student_name}
        image={certificate?.group_photo}
        logoBrand={certificate?.kindergarten_logo}
        submitDate={parseDate(certificate?.event_datetime)}
      />
    );
  }

  // If eventName is provided, show the event landing page
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full h-screen bg-[#FFF8E7] relative">
        <div className="absolute top-5 right-5 z-10 w-30 md:w-50">
          <LanguageSelector />
        </div>
        <Kv
          className="w-screen h-screen"
          logoBrand={eventName && eventVisit?.kindergarten_data?.logo}
        />
        {/* <img
          className="w-full h-full object-cover bg-slate-100"
          src={events.variables.banner_image?.value}
          alt=""
        /> */}
        {/* {eventName && eventVisit?.kindergarten_data?.logo && (
          <div className="absolute top-[7%] left-[55%] w-[20%] h-[13%]">
            <img
              src={eventVisit?.kindergarten_data?.logo}
              className="w-full h-full object-contain object-left"
              alt=""
            />
          </div>
        )} */}

        <div className="fixed bottom-[45%] md:bottom-20 w-full max-w-4xl xl:max-w-6xl p-10 left-[50%] translate-x-[-50%] flex justify-center">
          {!isLoadingEvents && eventsList && eventsList.length > 0 && (
            <div className="flex flex-col justify-center items-center w-200 space-y-4">
              <Select
                value={eventName || eventSelected || ""}
                onValueChange={(value) => {
                  setEventSelected(value);
                }}
              >
                <SelectTrigger className="w-full text-base md:text-xl h-10 md:h-15 text-black bg-white">
                  <SelectValue placeholder="Select an event">
                    {eventSelected || "Select an event"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className=" z-2001 max-h-none bg-white">
                  {eventsList.map((event) => (
                    <SelectItem
                      key={event.name}
                      className=" text-base md:text-lg bg-white! hover:bg-slate-200! text-black! cursor-pointer"
                      value={event.name}
                    >
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="text-lg md:text-3xl h-10 md:h-15 rounded-full text-center w-full"
                onClick={() => handleEventSelect(eventSelected || "")}
              >
                Go to Event
              </Button>
            </div>
          )}
        </div>
        {eventName && (
          <CertificateModal>
            <Button className="fixed bottom-[15%] rounded-full left-[50%] translate-x-[-50%] h-20 px-10 cursor-pointer">
              <span className=" text-4xl">Get Certificate</span>
            </Button>
          </CertificateModal>
        )}
      </main>
    </Suspense>
  );
};

export const Component = WelcomePage;
