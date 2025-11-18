import { lazy, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { EVENT_PAGES } from "@/config/event-pages";

const Certificate = lazy(() =>
  import("@kindergarten-demo-day/sections/certificate-section").then(
    (module) => ({
      default: module.Certificate,
    })
  )
);

const CertificatePage = () => {
  const { studentName } = useParams<{ studentName: string }>();

  // Redirect to welcome page if no student name is provided
  if (!studentName) {
    return (
      <Navigate to={`/${EVENT_PAGES.KINDERGARTEN_DEMO_DAY.SITE_URL}`} replace />
    );
  }

  const decodedStudentName = decodeURIComponent(studentName);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Certificate studentName={decodedStudentName} />
    </Suspense>
  );
};

export const Component = CertificatePage;
