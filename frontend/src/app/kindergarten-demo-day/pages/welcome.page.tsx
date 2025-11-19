import { lazy, Suspense, useMemo } from "react";
import { Button } from "@atoms/button";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useGetCertificate } from "../api/use-get-certificate";
import { Certificate } from "../sections/certificate";
import { parseDate } from "@/core/utils/common";
import { useSearchParams } from "react-router-dom";

const CertificateModal = lazy(() =>
  import(
    "@/app/kindergarten-demo-day/components/modals/certificate-modal"
  ).then((module) => ({
    default: module.CertificateModal,
  }))
);

const WelcomePage = () => {
  const events = useEventPageContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const eventName = searchParams.get("event") || undefined;
  const token = searchParams.get("certificate_token") || undefined;

  // Fetch certificate data using the token
  const { data, certificate, isLoading, error, isSuccess } =
    useGetCertificate(token);

  if (isSuccess && certificate?.student_name)
    return (
      <Certificate
        studentName={certificate?.student_name}
        image={certificate?.group_photo}
        logoBrand={certificate?.kindergarten_logo}
        submitDate={parseDate(certificate?.registration_date)}
      />
    );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full h-screen bg-[#FFF8E7]">
        <img
          className="w-full h-full object-cover bg-slate-100"
          src={events.variables.banner_image?.value}
          alt=""
        />
        <CertificateModal>
          <Button className="fixed bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] h-20 px-10 cursor-pointer">
            <span className=" text-4xl">Get Certificate</span>
          </Button>
        </CertificateModal>
      </main>
    </Suspense>
  );
};

export const Component = WelcomePage;
