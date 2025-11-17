import { HTMLAttributes, type FC, useRef } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useLocales } from "@/core/hooks/use-locales";
import { Container } from "../components/container";
import { Heading, Text } from "../components/typography";
import { toJpeg } from "html-to-image";
import download from "downloadjs";
import { jsPDF } from "jspdf";

export type CertificateSectionProps = HTMLAttributes<HTMLDivElement> & {
  studentName: string;
};
const rules = ["WebView", "(iPhone|iPod|iPad)(?!.*Safari/)", "Android.*(wv)"];

export const CertificateSection: FC<CertificateSectionProps> = ({
  className,
  studentName,
}) => {
  const { currentLanguage } = useLocales();
  const certificateRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString(
    currentLanguage === "vn" ? "vi-VN" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // const handleDownloadJPEG = async () => {
  //   if (!certificateRef.current) return;

  //   try {
  //     const dataUrl = await toJpeg(certificateRef.current, {
  //       quality: 1.0,
  //       pixelRatio: 2,
  //       backgroundColor: "#ffffff",
  //     });

  //     download(
  //       dataUrl,
  //       `certificate-${studentName.replace(/\s+/g, "-")}.jpg`,
  //       "image/jpeg"
  //     );
  //   } catch (error) {
  //     console.error("Error generating JPEG:", error);
  //     alert(
  //       "Failed to generate JPEG. Please try again or use the Print option."
  //     );
  //   }
  // };

  const buildPng = async () => {
    console.log(certificateRef.current);
    
    if (!certificateRef.current) return;

    let dataUrl = "";
    const minDataLength = 2000000;
    let i = 0;
    const maxAttempts = 10;

    while (dataUrl.length < minDataLength && i < maxAttempts) {
      dataUrl = await toJpeg(certificateRef.current);
      i += 1;
    }

    // Convert Data URL to Blob
    const blob = await (await fetch(dataUrl)).blob();

    return blob;
    // // // Create a Blob URL for the download
    // // const url = URL.createObjectURL(blob);

    // // Create an anchor element and trigger the download
    // const link = document.createElement('a');
    // link.href = `kitefasterCustomUrlScheme://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg`;
    // link.setAttribute('download', 'card.png'); // Set the filename
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    // // Clean up the Blob URL
    // // URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    const ua = window.navigator.userAgent;
    const regex = new RegExp(`(${rules.join("|")})`, "ig");

    if (ua.match(regex) && /android/i.test(ua)) {
      alert("No support for WebView on Android devices.");
      return;
    }

    let dataUrl = await buildPng();
    download(dataUrl, `certificate_${new Date().getTime()}`);
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      const dataUrl = await toJpeg(certificateRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      // Convert data URL to image for PDF
      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const imgWidth = 297; // A4 width in mm (landscape)
        const imgHeight = 210; // A4 height in mm (landscape)

        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        pdf.addImage(dataUrl, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save(`certificate-${studentName.replace(/\s+/g, "-")}.pdf`);
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Failed to generate PDF. Please try again or use the Print option."
      );
    }
  };

  return (
    <div className={cn("py-[20rem] md:py-[30rem] bg-gray-50", className)}>
      <Container>
        <div className="max-w-[1920px] mx-auto">
          {/* Certificate Card */}
          <div
            ref={certificateRef}
            data-certificate
            className="bg-white shadow-2xl rounded-[2.5rem] border-[10rem] border-kdd-primary p-[10rem] md:p-[20rem] relative overflow-hidden"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-[30rem] h-[30rem] border-t-[5rem] border-l-[5rem] border-kdd-secondary"></div>
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] border-t-[5rem] border-r-[5rem] border-kdd-secondary"></div>
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] border-b-[5rem] border-l-[5rem] border-kdd-secondary"></div>
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] border-b-[5rem] border-r-[5rem] border-kdd-secondary"></div>

            <div className="text-center space-y-[10rem]">
              {/* Header */}
              <div className="space-y-[2.5rem]">
                <Heading level={1} className="text-kdd-primary">
                  {currentLanguage === "vn" ? "Giấy Chứng Nhận" : "Certificate"}
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
                      {currentLanguage === "vn" ? "Ban Giám Hiệu" : "Principal"}
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

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-[5rem] mt-[10rem]">
            <button
              onClick={handleDownload}
              className="px-[10rem] py-[3.75rem] bg-kdd-primary text-white text-[5rem] rounded-[2.5rem] hover:bg-kdd-primary-hover transition-all duration-300 print:hidden"
            >
              {currentLanguage === "vn"
                ? "Tải Ảnh (JPEG)"
                : "Download Photo (JPEG)"}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-[10rem] py-[3.75rem] bg-kdd-secondary text-white text-[5rem] rounded-[2.5rem] hover:opacity-90 transition-all duration-300 print:hidden"
            >
              {currentLanguage === "vn" ? "Tải PDF" : "Download PDF"}
            </button>
            <button
              onClick={() => window.print()}
              className="px-[10rem] py-[3.75rem] bg-gray-600 text-white text-[5rem] rounded-[2.5rem] hover:bg-gray-700 transition-all duration-300 print:hidden"
            >
              {currentLanguage === "vn" ? "In" : "Print"}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
