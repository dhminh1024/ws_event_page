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
import parser from "html-react-parser";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const params = useParams();
  const event = useEventPageContext();

  // console.log(event.variables);

  return (
    <div className="bg-hr-background overflow-hidden">
      <Helmet>
        <title>
          {"Purchasing ticket"} | {env.HAPPY_RUN.TITLE_PAGE}
        </title>
      </Helmet>
      <div className="pallette">
        <span className="text-hr-honey"></span>
        <span className="text-hr-ember"></span>
        <span className="text-brand-persian"></span>
      </div>
      <div className="bg-gray-400 h-[300rem]"></div>

      <PurchasingForm />
    </div>
  );
};

Component.displayName = "Purchasing Ticket";
