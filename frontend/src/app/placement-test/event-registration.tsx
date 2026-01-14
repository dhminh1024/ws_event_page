import { useLocales } from "@/core/hooks/use-locales";
import { useParams } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@atoms/button";
import { LanguageSwitcher } from "@features/preferences/language-switcher";
import useGetLeadByBookingID from "./api/use-get-lead-by-booking-id";
import useRegisterForEvent from "./api/use-register-for-event";
import { Check, Loader2 } from "lucide-react";
import { HouseSimple, ListNumbers, User } from "phosphor-react";
import BannerTopPC from "./assets/images/banner-top-pc.jpg";
import BannerTopMB from "./assets/images/banner-top-mb.jpg";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { ModalProps, NotificationModal } from "./components/notification-modal";

export const Component = () => {
  const { t, currentLanguage } = useLocales();
  const { isDesktop } = useResponsive();
  const params = useParams();
  const { id: bookingID } = params;

  const {
    lead,
    error: getLeadError,
    mutate,
  } = useGetLeadByBookingID(bookingID, !bookingID);
  const { register, loading } = useRegisterForEvent();

  const [message, setMessage] = useState<{
    type?: ModalProps["type"];
    title: string;
    message: ReactNode;
  }>();
  const [registered, setRegistered] = useState(false);

  // Check if already registered for event
  useEffect(() => {
    if (
      lead?.status === "Registered for event" ||
      lead?.status === "Confirmation Email Sent" ||
      lead?.status === "Checked in"
    ) {
      setRegistered(true);
    }
  }, [lead]);

  const handleConfirm = async () => {
    if (!bookingID) return;

    try {
      await register({ booking_id: bookingID });
      setRegistered(true);
      setMessage({
        title: t("placement_test.event_registration.success_title"),
        message: t("placement_test.event_registration.success_message"),
      });
      mutate();
    } catch (error: any) {
      setMessage({
        type: "error",
        title: t("placement_test.event_registration.error_title"),
        message: t("placement_test.event_registration.error_message"),
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (getLeadError) {
    return (
      <div className="flex items-center justify-center h-screen bg-pt-background">
        <div className="text-center p-8">
          <p className="text-red-500 text-lg">
            {t("placement_test.event_registration.invalid_link")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pt-background min-h-screen p-5">
      <div className="flex justify-center items-center h-full">
        <div className="w-full md:w-[800px] m-auto">
          <div className="flex items-center justify-end mb-2">
            <span className="text-sm text-pt-blue">
              {t("common.language")}:
            </span>
            <LanguageSwitcher className="ml-2 w-6 h-4 bg-transparent!" />
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            {isDesktop && <img src={BannerTopPC} alt="Banner" />}
            {!isDesktop && <img src={BannerTopMB} alt="Banner" />}

            <div className="p-8">
              <h1 className="text-xl md:text-2xl font-bold text-pt-primary mb-6 text-center">
                {t("placement_test.event_registration.title")}
              </h1>

              <div className="my-6 bg-gray-50 p-4 rounded-lg">
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

              <div className="text-center">
                {registered ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-6 h-6" />
                      <span className="text-lg font-semibold">
                        {t("placement_test.event_registration.already_registered")}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {t("placement_test.event_registration.wait_for_confirmation")}
                    </p>
                  </div>
                ) : (
                  <Button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-3"
                  >
                    {loading && (
                      <Loader2 className="mr-2 animate-spin w-4 h-4" />
                    )}
                    {t("placement_test.event_registration.confirm_button")}
                  </Button>
                )}
              </div>
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

Component.displayName = "Event Registration Confirmation";
