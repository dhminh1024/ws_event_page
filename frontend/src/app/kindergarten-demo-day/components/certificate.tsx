import { HTMLAttributes, type FC, useRef, useState, useEffect } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useLocales } from "@/core/hooks/use-locales";

import { toJpeg } from "html-to-image";
import download from "downloadjs";
import { jsPDF } from "jspdf";
import { Dialog, DialogContent } from "@atoms/dialog";
import { ProcessLoadingDialog } from "@molecules/process-loading-dialog";
import CertBackground from "../assets/images/cert-bg.png";
import LogoPrimary from "../assets/images/cert-logo-primary.png";
import BrandLogo from "../assets/images/brand-1.png";
import LogoSecondary from "../assets/images/cert-logo-secondary.png";
import CertHeading from "../assets/images/cert-heading.png";
import LogoHappyJourney from "../assets/images/cert-logo-hj.png";
import DecorItem1 from "../assets/images/cert-item-1.png";
import DecorItem2 from "../assets/images/cert-item-2.png";
import DecorItem3 from "../assets/images/cert-item-3.png";
import DecorItem4 from "../assets/images/cert-item-4.png";
import { Button } from "@atoms/button";
import { format } from "date-fns";

export type CertificateProps = HTMLAttributes<HTMLDivElement> & {
  studentName: string;
  logoBrand?: string;
  image?: string;
  submitDate?: Date;
};
const rules = ["WebView", "(iPhone|iPod|iPad)(?!.*Safari/)", "Android.*(wv)"];

export const Certificate: FC<CertificateProps> = ({
  className,
  studentName,
  logoBrand,
  image,
  submitDate,
}) => {
  const { currentLanguage } = useLocales();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState<"photo" | "pdf">("photo");
  const isCancelRef = useRef(false);
  const [heightScreen, setHeightScreen] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeightScreen(window.innerHeight);
    });
    setHeightScreen(window.innerHeight);
  }, []);

  const buildPng = async (target: HTMLElement | null) => {
    if (!target) return null;
    const cert = target;

    // Get the actual dimensions of the certificate element
    const rect = cert.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Update progress to show we're starting
    setDownloadProgress(10);

    // Check if cancelled
    if (isCancelRef.current) {
      throw new Error("Download cancelled by user");
    }

    // Generate the image with high quality
    const dataUrl = await toJpeg(cert, {
      quality: 1.0, // Maximum quality
      pixelRatio: 1, // Keep original size (6000px width)
      backgroundColor: "#ffffff",
      width: width, // Maintain original width
      height: height, // Maintain original height
    });

    // Update progress after image generation
    setDownloadProgress(70);

    // Check if cancelled before blob conversion
    if (isCancelRef.current) {
      throw new Error("Download cancelled by user");
    }

    // Convert Data URL to Blob
    setDownloadProgress(90); // 90%
    const blob = await (await fetch(dataUrl)).blob();
    setDownloadProgress(100);
    return blob;
  };

  const handleDownloadPhoto = async () => {
    isCancelRef.current = false;
    setDownloadProgress(0);
    setIsDownloading(true);
    setDownloadType("photo");
    try {
      const pngBlob = await buildPng(document.getElementById("certificate"));
      if (pngBlob) {
        download(pngBlob, "certificate.jpg", "image/jpeg");
      }
    } catch (error) {
      console.error("Error generating certificate image:", error);
    } finally {
      // Reset progress after a short delay
      setTimeout(() => {
        resetProcess();
      }, 1000);
    }
  };

  const handleDownloadPDF = async () => {
    isCancelRef.current = false;
    setDownloadProgress(0);
    setIsDownloading(true);
    setDownloadType("pdf");
    try {
      const pngBlob = await buildPng(document.getElementById("certificate"));
      if (pngBlob) {
        // Convert blob to data URL for jsPDF
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;

          // Certificate dimensions: 2000px x 1414px
          // Convert to A4 landscape or custom size
          // Using custom size to maintain aspect ratio
          const aspectRatio = 1414 / 2000;
          const pdfWidth = 297; // A4 landscape width in mm
          const pdfHeight = pdfWidth * aspectRatio;

          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [pdfWidth, pdfHeight],
          });

          // Add image to PDF (full page)
          pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);

          // Download the PDF
          pdf.save("certificate.pdf");

          setDownloadProgress(100);
        };
        reader.readAsDataURL(pngBlob);
      }
    } catch (error) {
      console.error("Error generating certificate PDF:", error);
    } finally {
      // Reset progress after a short delay
      setTimeout(() => {
        resetProcess();
      }, 1000);
    }
  };

  const resetProcess = () => {
    setDownloadProgress(0);
    setIsDownloading(false);
    isCancelRef.current = true;
  };

  return (
    <center>
      {/* Dom to display */}
      <div
        className={cn("w-screen h-screen p-[2%] flex flex-col", className)}
        style={{
          backgroundImage: `url(${CertBackground})`,
          backgroundSize: "cover",
        }}
      >
        <img
          src={DecorItem1}
          alt="DecorItem1"
          className="w-[15%] md:w-[8%] h-auto absolute z-10 top-[10%] md:top-[20%] right-[7%]"
        />
        <img
          src={DecorItem2}
          alt="DecorItem2"
          className="w-[15%] md:w-[7%] h-auto absolute z-10 bottom-[15%] md:bottom-[25%] right-[8%]"
        />
        <img
          src={DecorItem3}
          alt="DecorItem3"
          className="w-[15%] md:w-[8%] h-auto absolute z-10 top-[10%] md:top-[20%] left-[8%]"
        />
        <img
          src={DecorItem4}
          alt="DecorItem4"
          className="w-[15%] md:w-[8%] h-auto absolute z-10 bottom-[15%] md:bottom-[25%] left-[7%]"
        />
        <div className="h-[5%] md:h-[10%] xl:h-[15%] flex justify-between">
          <div className="flex gap-[10%]">
            <img
              className="w-auto h-[70%]"
              src={LogoPrimary}
              alt="LogoPrimary"
            />
            <img className="w-auto h-[70%]" src={logoBrand} alt="BrandLogo" />
          </div>
          <img
            className="w-auto h-full"
            src={LogoSecondary}
            alt="LogoSecondary"
          />
        </div>
        <div className="flex-1 mx-auto w-full max-w-[1480px] relative z-50 flex items-center">
          <div className="w-full">
            <div
              className={cn("photo w-[80%] mt-[5%] relative", {
                "w-[60%] mt-[-10%]": heightScreen < 1000,
              })}
            >
              <div
                className={cn(
                  "w-full xl:w-[80%] bg-gray-300 mt-10 mx-auto rounded-[20px] aspect-video",
                  "shadow-[5px_2px_0px_1px_rgba(0,0,0,0.2)] relative -rotate-2 overflow-hidden"
                )}
              >
                <div className="w-full h-full border-8 rounded-[20px] border-white overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center "
                    src={image}
                    crossOrigin="anonymous"
                    alt=""
                  />
                </div>

                <img
                  className="w-[13%] h-auto absolute bottom-0 right-0 mx-auto bg-white rounded-[20%_0%_0%_0%] p-[1%] z-10"
                  src={LogoHappyJourney}
                  alt="Logo Happy Journey"
                />
              </div>
              <img
                className="w-[60%] xl:w-[50%] h-auto absolute bottom-[-9%] left-0 right-0 mx-auto"
                src={CertHeading}
                alt="Certificate Heading"
              />
            </div>

            <p
              className={cn(
                "bg-[#009483] text-[15px] md:text-[25px] xl:text-[30px] inline-block text-white px-[2%] py-[0%] rounded-full mt-[3%]",
                {
                  "mt-[2%] xl:text-[20px]": heightScreen < 1000,
                }
              )}
            >
              {format(submitDate || new Date(), "dd.MM.yyyy")}
            </p>
            <p
              className={cn(
                "text-[#F05023] text-[30px] md:text-[50px] xl:text-[50px] font-black uppercase mt-[2%]",
                {
                  "mt-[1%] xl:text-[40px]": heightScreen < 1000,
                }
              )}
            >
              {studentName}
            </p>
            <p
              className={cn(
                "text-[#009483] text-[14px] xs:text-[16px] md:text-[20px] xl:text-[28px] font-bold mt-[2%]",
                {
                  "mt-[1%] xl:text-[20px]": heightScreen < 1000,
                }
              )}
            >
              On this joyful day, you explored the wonders of Wellspring Saigon
              – The Happy School – for the very first time.
            </p>
            <p
              className={cn(
                "text-[#009483] text-[14px] xs:text-[16px] md:text-[20px] xl:text-[28px] font-bold",
                {
                  "xl:text-[20px]": heightScreen < 1000,
                }
              )}
            >
              We proudly awarded you as:
              <span className="text-[#F05023] ml-[10px]">
                A Little Inventor.
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Dom to download */}
      <div className="fixed top-full left-full z-[-1]">
        <div
          ref={certificateRef}
          id={"certificate"}
          className={cn("w-[2000px] h-[1414px] p-[2%] ", className)}
          style={{
            backgroundImage: `url(${CertBackground})`,
            backgroundSize: "cover",
          }}
        >
          <img
            src={DecorItem1}
            alt="DecorItem1"
            className="w-[8%] h-auto absolute top-[30%] right-[7%]"
          />
          <img
            src={DecorItem2}
            alt="DecorItem2"
            className="w-[7%] h-auto absolute bottom-[20%] right-[8%]"
          />
          <img
            src={DecorItem3}
            alt="DecorItem3"
            className="w-[8%] h-auto absolute top-[30%] left-[8%]"
          />
          <img
            src={DecorItem4}
            alt="DecorItem4"
            className="w-[8%] h-auto absolute bottom-[15%] left-[7%]"
          />
          <div className="h-[15%] flex justify-between">
            <div className="flex gap-[10%]">
              <img
                className="w-auto h-[70%]"
                src={LogoPrimary}
                alt="LogoPrimary"
              />
              <img className="w-auto h-[70%]" src={logoBrand} alt="BrandLogo" />
            </div>
            <img
              className="w-auto h-full"
              src={LogoSecondary}
              alt="LogoSecondary"
            />
          </div>
          <div className="photo w-[80%] mt-[5%] relative">
            <div
              className={cn(
                "w-[80%] border-8 border-white bg-gray-300 mt-10 mx-auto rounded-[20px] aspect-16/9",
                "shadow-[5px_2px_0px_1px_rgba(0,0,0,0.2)] relative rotate-[-2deg] overflow-hidden"
              )}
            >
              <img
                className="w-full h-full object-cover object-center"
                src={image}
                crossOrigin="anonymous"
                alt=""
              />
              <img
                className="w-[13%] h-auto absolute bottom-0 right-0 mx-auto bg-white rounded-[20%_0%_0%_0%] p-[1%]"
                src={LogoHappyJourney}
                alt="Logo Happy Journey"
              />
            </div>
            <img
              className="w-[50%] h-auto absolute bottom-[-9%] left-0 right-0 mx-auto"
              src={CertHeading}
              alt="Certificate Heading"
            />
          </div>
          <p className="bg-[#009483] text-[30px] inline-block text-white px-[2%] py-[0%] rounded-full mt-[3%]">
            {format(submitDate || new Date(), "dd.MM.yyyy")}
          </p>
          <p className="text-[#F05023] text-[50px] font-black uppercase mt-[2%]">
            {studentName}
          </p>
          <p className="text-[#009483] text-[28px] font-bold mt-[2%]">
            On this joyful day, you explored the wonders of Wellspring Saigon –
            The Happy School – for the very first time.
          </p>
          <p className="text-[#009483] text-[28px] font-bold">
            We proudly awarded you as:
            <span className="text-[#F05023] ml-[10px]">A Little Inventor.</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row px-20 gap-4 justify-center fixed z-9999 bottom-10 left-0 right-0 mx-auto">
        <Button
          className="cursor-pointer text-xl"
          size="lg"
          onClick={handleDownloadPhoto}
        >
          Download Photo
        </Button>
        <Button
          className="cursor-pointer text-xl"
          size="lg"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      </div>

      <ProcessLoadingDialog
        open={isDownloading}
        progress={downloadProgress}
        title={
          downloadType === "photo" ? "Downloading Photo" : "Downloading PDF"
        }
        text={`Generating your certificate... ${Math.round(downloadProgress)}%`}
      />
    </center>
  );
};
