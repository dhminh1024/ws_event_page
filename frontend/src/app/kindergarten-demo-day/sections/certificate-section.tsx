import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useLocales } from "@/core/hooks/use-locales";
import { Container } from "../components/container";
import { Heading, Text } from "../components/typography";

export type CertificateSectionProps = HTMLAttributes<HTMLDivElement> & {
  studentName: string;
};

export const CertificateSection: FC<CertificateSectionProps> = ({
  className,
  studentName,
}) => {
  const { currentLanguage } = useLocales();

  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString(
    currentLanguage === "vn" ? "vi-VN" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className={cn("py-[20rem] md:py-[30rem] bg-gray-50", className)}>
      <Container>
        <div className="max-w-[1920px] mx-auto">
          {/* Certificate Card */}
          <div className="bg-white shadow-2xl rounded-[2.5rem] border-[10rem] border-kdd-primary p-[10rem] md:p-[20rem] relative overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-[30rem] h-[30rem] border-t-[5rem] border-l-[5rem] border-kdd-secondary"></div>
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] border-t-[5rem] border-r-[5rem] border-kdd-secondary"></div>
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] border-b-[5rem] border-l-[5rem] border-kdd-secondary"></div>
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] border-b-[5rem] border-r-[5rem] border-kdd-secondary"></div>

            <div className="text-center space-y-[10rem]">
              {/* Header */}
              <div className="space-y-[2.5rem]">
                <Heading level={1} className="text-kdd-primary">
                  {currentLanguage === "vn"
                    ? "Giấy Chứng Nhận"
                    : "Certificate"}
                </Heading>
                <p className="text-[6.25rem] md:text-[7.5rem] text-gray-600 font-semibold uppercase tracking-wider">
                  {currentLanguage === "vn"
                    ? "Chứng Nhận Tham Gia"
                    : "Certificate of Participation"}
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center gap-[5rem]">
                <div className="h-[1.25rem] w-[30rem] bg-kdd-primary"></div>
                <div className="w-[5rem] h-[5rem] rotate-45 bg-kdd-primary"></div>
                <div className="h-[1.25rem] w-[30rem] bg-kdd-primary"></div>
              </div>

              {/* Content */}
              <div className="space-y-[7.5rem] py-[10rem]">
                <p className="text-[5.625rem] md:text-[6.25rem] text-gray-700">
                  {currentLanguage === "vn"
                    ? "Giấy chứng nhận này được trao cho"
                    : "This certificate is presented to"}
                </p>

                <Heading
                  level={2}
                  className="text-kdd-secondary font-serif italic py-[5rem] border-b-[0.625rem] border-t-[0.625rem] border-kdd-primary"
                >
                  {studentName}
                </Heading>

                <p className="text-[5rem] md:text-[5.625rem] text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  {currentLanguage === "vn"
                    ? `Đã tích cực tham gia Ngày Hội Mẫu Giáo ${currentYear} tại Wellspring Sài Gòn. Chúng tôi ghi nhận sự nhiệt tình và năng lượng tuyệt vời của em trong suốt chương trình.`
                    : `For active participation in Kindergarten Demo Day ${currentYear} at Wellspring Saigon. We recognize your wonderful enthusiasm and energy throughout the program.`}
                </p>
              </div>

              {/* Date and Signature Section */}
              <div className="pt-[15rem] space-y-[10rem]">
                <p className="text-gray-600">
                  {currentLanguage === "vn" ? "Ngày cấp:" : "Date:"}{" "}
                  <span className="font-semibold">{currentDate}</span>
                </p>

                <div className="flex justify-center gap-[20rem] md:gap-[40rem] pt-[10rem]">
                  <div className="text-center space-y-[2.5rem]">
                    <div className="h-[20rem] border-t-[0.625rem] border-gray-400 w-[60rem]"></div>
                    <p className="text-[4.375rem] text-gray-600 font-semibold">
                      {currentLanguage === "vn"
                        ? "Ban Giám Hiệu"
                        : "Principal"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Wellspring Logo Placeholder */}
              <div className="pt-[10rem]">
                <p className="text-[7.5rem] md:text-[9.375rem] font-bold text-kdd-primary">
                  WELLSPRING SAIGON
                </p>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="text-center mt-[10rem]">
            <button
              onClick={() => window.print()}
              className="px-[10rem] py-[3.75rem] bg-kdd-primary text-white rounded-[2.5rem] hover:bg-kdd-primary-hover transition-all duration-300 print:hidden"
            >
              {currentLanguage === "vn" ? "In Giấy Chứng Nhận" : "Print Certificate"}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
