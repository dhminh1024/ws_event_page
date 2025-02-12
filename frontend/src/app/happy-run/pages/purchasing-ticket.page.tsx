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
      </div>
      <div className="bg-gray-400 h-[300rem]"></div>
      <div className="px-[10rem] md:px-[8%]">
        <center className="mb-[40rem]">
          <Typography.Heading
            className="py-[40rem] text-[45rem] text-hr-blue leading-[1.2] font-extrabold"
            level={2}
          >
            {parser(t("happy_run.form_heading"))}
          </Typography.Heading>
          <Typography.Paragraph className="text-hr-blue text-[20rem] font-semibold">
            <span>{t("happy_run.form_description_1")}</span>
            <span className="ml-[5rem] text-[23rem] font-black uppercase">
              {event.variables.event_name?.value}
            </span>
          </Typography.Paragraph>
          <Typography.Paragraph className="text-hr-blue text-[20rem] font-semibold mb-[20rem]">
            {t("happy_run.form_description_2")}
          </Typography.Paragraph>
          <div className="bg-white inline-block mx-auto px-[60rem] py-[10rem] rounded-full">
            <Typography.Paragraph className="mb-0 text-hr-blue text-[20rem] font-semibold leading-[1.2]">
              <span>{t("common.event_email")}: </span>
              <span>{event.variables.event_email?.value}</span>
            </Typography.Paragraph>
          </div>
        </center>
        {/* Info ticket */}
        <div className="info-ticket-table mb-[30rem]">
          <Typography.Heading
            className="text-white rounded-t-[30rem] bg-hr-blue font-extrabold text-[24rem] uppercase text-center py-[10rem] mb-[30rem]"
            level={4}
          >
            {
              event.variables?.[
                currentLanguage === "vn"
                  ? "info_ticket_heading_vn"
                  : "info_ticket_heading_en"
              ]?.value
            }
          </Typography.Heading>
          <img
            src={
              event.variables?.[
                currentLanguage === "vn"
                  ? "info_ticket_table_vn"
                  : "info_ticket_table_en"
              ]?.value
            }
            alt="info ticket"
          />
          <Typography.Paragraph className="mt-[30rem] text-center text-hr-blue text-[18rem]">
            {
              event.variables?.[
                currentLanguage === "vn"
                  ? "info_ticket_table_desc_vn"
                  : "info_ticket_table_desc_en"
              ]?.value
            }
          </Typography.Paragraph>
          <img
            className="mt-[30rem]"
            src={
              event.variables?.[
                currentLanguage === "vn"
                  ? "tshirt_size_table_vn"
                  : "tshirt_size_table_en"
              ]?.value
            }
            alt="tshirt size"
          />
        </div>
        <PurchasingForm />
      </div>
    </div>
  );
};

Component.displayName = "Purchasing Ticket";
