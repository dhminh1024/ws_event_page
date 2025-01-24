import { useTranslation } from "react-i18next";
import {
  BackgroundCloud,
  BackgroundCoin,
} from "@happy-box/components/background";
import { Header } from "@/app/happy-box/sections/header";
import env from "@/config/env";
import Typography from "@happy-box/components/typography";
import { Input } from "@atoms/input";
import { LunarButton } from "@happy-box/components/button";
import { ChooseLetterModal } from "@/app/happy-box/components/choose-letter-modal";
import { RadioGroup, RadioGroupItem } from "@atoms/radio-group";
import { Label } from "@atoms/label";
import { generateArrayWithRandomLetters } from "@happy-box/utils/ultils";
import { useLocales } from "@/core/hooks/use-locales";
import { FileInput, FileUploader, ImageSvgDraw } from "@molecules/uploader";
import { CameraIcon, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UploadModal } from "../components/upload-modal";
import useUploadImageChallenge from "@/api/happy-box/use-upload-image-challenge";
import { useNavigate, useParams } from "react-router-dom";
import { useSubmissions } from "@happy-box/context/use-submissions";
import { useSettings } from "@/lib/auth/settings/use-settings";
import { cleanPath } from "@/lib/utils/common";
import { useChallengeList } from "@happy-box/context/use-challenge-list";
import { ThankYouModal } from "../components/thank-you-modal";
import { log } from "console";
import { Camera } from "phosphor-react";
import { Helmet } from "react-helmet";
import { EVENT_PAGES } from "@/config/event-pages";
import { PurchasingForm } from "../sections/purchasing-form";
import { PDFReader } from "../components/pdf-reader";

export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const params = useParams();
  const challengeId = params.id;
  const { default_homepage_url } = useSettings();

  return (
    <>
      <Helmet>
        <title>
          {"Purchasing ticket"} | {env.HAPPY_RUN.TITLE_PAGE}
        </title>
      </Helmet>
      <div className=" w-full h-full min-h-screen">
        <BackgroundCoin className="relative w-full h-full min-h-screen">
          <PurchasingForm />
        </BackgroundCoin>
        {/* <iframe
            className="w-full h-screen"
          src={"https://files.wellspring.edu.vn/tuition-fee-2526/vi"}
        ></iframe> */}
        {/* <PDFReader className="w-full h-screen" url={"https://pdfobject.com/pdf/sample.pdf"} /> */}
      </div>
    </>
  );
};

Component.displayName = "Purchasing Ticket";
