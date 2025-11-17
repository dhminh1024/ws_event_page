import { lazy, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { EVENT_PAGES } from "@/config/event-pages";

const HeaderSection = lazy(() =>
  import("@kindergarten-demo-day/sections/header").then((module) => ({
    default: module.Header,
  }))
);

const CertificateSection = lazy(() =>
  import("@kindergarten-demo-day/sections/certificate-section").then((module) => ({
    default: module.CertificateSection,
  }))
);

const FooterSection = lazy(() =>
  import("@kindergarten-demo-day/sections/footer").then((module) => ({
    default: module.Footer,
  }))
);

const CertificatePage = () => {
  const { studentName } = useParams<{ studentName: string }>();

  // Redirect to welcome page if no student name is provided
  if (!studentName) {
    return <Navigate to={`/${EVENT_PAGES.KINDERGARTEN_DEMO_DAY.SITE_URL}`} replace />;
  }

  const decodedStudentName = decodeURIComponent(studentName);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex flex-col print:block">
        <HeaderSection className="print:hidden" />
        <main className="flex-1">
          <CertificateSection studentName={decodedStudentName} />
        </main>
        <FooterSection className="print:hidden" />
      </div>
    </Suspense>
  );
};

export const Component = CertificatePage;
