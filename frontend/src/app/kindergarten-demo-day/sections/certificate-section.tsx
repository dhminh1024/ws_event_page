import { HTMLAttributes, type FC, useRef, useState } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useLocales } from "@/core/hooks/use-locales";
import { Container } from "../components/container";
import { Heading, Text } from "../components/typography";
import { toJpeg } from "html-to-image";
import download from "downloadjs";
import { jsPDF } from "jspdf";
import { Dialog, DialogContent } from "@atoms/dialog";
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
import { PrimaryButton } from "../components/button";

export type CertificateProps = HTMLAttributes<HTMLDivElement> & {
  studentName: string;
};
const rules = ["WebView", "(iPhone|iPod|iPad)(?!.*Safari/)", "Android.*(wv)"];

export const Certificate: FC<CertificateProps> = ({
  className,
  studentName,
}) => {
  const { currentLanguage } = useLocales();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const isCancelRef = useRef(false);

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
    try {
      const pngBlob = await buildPng(document.getElementById("certificate"));
      if (pngBlob) {
        download(pngBlob, "certificate-photo.jpg", "image/jpeg");
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

  const resetProcess = () => {
    setDownloadProgress(0);
    isCancelRef.current = true;
  };

  return (
    <center>
      <div
        ref={certificateRef}
        id={"certificate"}
        className={cn("w-[2000px] h-[1414px] p-[2%] relative", className)}
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
            <img className="w-auto h-[70%]" src={BrandLogo} alt="BrandLogo" />
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
              "w-[80%] border-8 border-white bg-gray-300 mt-100 mx-auto rounded-[20rem] aspect-16/9",
              "shadow-[5rem_2rem_0rem_1rem_rgba(0,0,0,0.2)] relative rotate-[-2deg] overflow-hidden"
            )}
          >
            {/* <img
              className="w-full h-full object-cover object-center"
              src={
                "https://wellspring-production.s3.ap-southeast-1.amazonaws.com/large_t6_7a37e50a12.jpg"
              }
              alt=""
            /> */}
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
          28.11.2025
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
      <p className="text-[20rem] text-white">
        Downloading: {downloadProgress}%
      </p>
      <PrimaryButton className="mt-[20px]" onClick={handleDownloadPhoto}>
        Download Photo
      </PrimaryButton>
    </center>
  );
};
