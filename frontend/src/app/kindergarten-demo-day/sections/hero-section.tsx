import { HTMLAttributes, type FC, useState } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useLocales } from "@/core/hooks/use-locales";
import { Container } from "../components/container";
import { Heading, Text } from "../components/typography";
import { PrimaryButton } from "../components/button";
import { CertificateModal } from "../components/modals/certificate-modal";
import { useNavigate } from "react-router-dom";
import { EVENT_PAGES } from "@/config/event-pages";

export type HeroSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const HeroSection: FC<HeroSectionProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales();
  const event = useEventPageContext();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: {
    parentFullName: string;
    parentEmail: string;
    parentPhone: string;
    studentFullName: string;
  }) => {
    setLoading(true);

    // Simulate API call with mockup data
    setTimeout(() => {
      setLoading(false);
      setModalOpen(false);

      // Navigate to certificate page with student name
      navigate(`/${EVENT_PAGES.KINDERGARTEN_DEMO_DAY.SITE_URL}/certificate/${encodeURIComponent(data.studentFullName)}`);
    }, 1000);
  };

  return (
    <div className={cn("bg-gradient-to-b from-kdd-primary-light to-white py-[25rem] md:py-[40rem] min-h-[80vh] flex items-center", className)}>
      <Container>
        <div className="text-center space-y-[10rem] max-w-[1920px] mx-auto">
          <Heading level={1} className="text-kdd-primary">
            {currentLanguage === "vn"
              ? "Chào Mừng Đến Ngày Hội Mẫu Giáo"
              : "Welcome to Kindergarten Demo Day"}
          </Heading>

          <Text className="text-[6.25rem] md:text-[7.5rem] text-gray-700">
            {currentLanguage === "vn"
              ? "Chúng tôi rất vui mừng được chào đón bạn! Nhấn vào nút bên dưới để nhận giấy chứng nhận tham gia của con bạn."
              : "We're excited to welcome you! Click the button below to receive your child's certificate of participation."}
          </Text>

          <div className="pt-[10rem]">
            <PrimaryButton
              onClick={() => setModalOpen(true)}
              className="px-[15rem] py-[7.5rem] text-[5.625rem] md:text-[6.25rem]"
            >
              {currentLanguage === "vn"
                ? "Nhận Giấy Chứng Nhận"
                : "Receive Certificate"}
            </PrimaryButton>
          </div>
        </div>
      </Container>

      <CertificateModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};
