import { lazy, PropsWithChildren, Suspense, useMemo } from "react";
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

const CertificateModal = lazy(() =>
  import("@/app/kindergarten-demo-day/components/certificate-modal").then(
    (module) => ({
      default: module.CertificateModal,
    })
  )
);

type EventCardProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  title: string;
  eventDatetime: string;
  kindergartenLogo?: string;
  kindergartenTitle?: string;
  registrationOpen: boolean;
  onClick: () => void;
};

const EventCard = ({
  title,
  eventDatetime,
  kindergartenLogo,
  kindergartenTitle,
  registrationOpen,
  className,
  onClick,
}: EventCardProps) => {
  const formattedDate = useMemo(() => {
    return parseDate(eventDatetime);
  }, [eventDatetime]);

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-primary overflow-hidden",
        className
      )}
    >
      {/* Kindergarten Logo */}
      <div className="w-full h-auto overflow-hidden flex items-center justify-center">
        {kindergartenLogo ? (
          <img
            src={kindergartenLogo}
            alt={kindergartenTitle || title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
            {kindergartenTitle?.charAt(0) || "K"}
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
    </div>
  );
};

const WelcomePage = () => {
  const events = useEventPageContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const eventName = searchParams.get("event") || undefined;
  const token = searchParams.get("certificate_token") || undefined;

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
        submitDate={parseDate(certificate?.registration_date)}
      />
    );
  }

  // If eventName is provided, show the event landing page
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full h-screen bg-[#FFF8E7] relative">
        <div className="absolute top-5 right-5 z-10 w-50">
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

        <div className="fixed bottom-20 w-full max-w-4xl xl:max-w-6xl p-10 left-[50%] translate-x-[-50%] ">
          {!isLoadingEvents && eventsList && eventsList.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-center">
              {eventsList.map((event) => (
                <EventCard
                  className="w-full h-30 md:h-50"
                  key={event.name}
                  name={event.name}
                  title={event.title}
                  eventDatetime={event.event_datetime}
                  kindergartenLogo={event.kindergarten_logo}
                  kindergartenTitle={event.kindergarten_title}
                  registrationOpen={event.registration_open}
                  onClick={() => handleEventSelect(event.name)}
                />
              ))}
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
