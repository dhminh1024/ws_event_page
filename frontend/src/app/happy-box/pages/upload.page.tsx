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

export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const params = useParams();
  const challengeId = params.id;
  const { default_homepage_url } = useSettings();
  const { challenges } = useChallengeList();
  const challenge = challenges.find((c) => c.name === challengeId);
  const {
    submissions,
    refresh: refreshSubmissions,
    setShowThankYouModal,
  } = useSubmissions();
  const inputUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<Blob | null>();
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { handleUpload } = useUploadImageChallenge();
  const [isUploading, setIsUploading] = useState(false);

  const handleClickFinish = async () => {
    if (challengeId && croppedImage) {
      try {
        setIsUploading(true);
        await handleUpload(challengeId, croppedImage);
        if (submissions.length === challenges.length - 1) {
          setShowThankYouModal(true);
        }
        refreshSubmissions();
        backToHome();
      } catch (error) {
        alert("Upload failed" + JSON.stringify(error));
      }
      setIsUploading(false);
    }
  };

  const handleCropCompleted = (file: Blob | null, url: string) => {
    setCroppedImage(file);
    setPreview(url);
    if (inputUploadRef.current) {
      inputUploadRef.current.value = "";
    }
  };

  const handleDeletePhoto = () => {
    setCroppedImage(null);
    setFile(null);
    setPreview(null);
  };

  const handleOpenFile = () => {
    inputUploadRef.current?.click();
  };

  const backToHome = () => {
    navigate(cleanPath(`/${EVENT_PAGES.HAPPY_BOX.SITE_URL}`));
  };

  useEffect(() => {
    if (submissions && challengeId) {
      const submission = submissions.find(
        (s) => s.happy_box_challenge.name === challengeId
      );
      if (submission && submission.image) {
        setPreview(submission.image);
      }
    }
  }, [challengeId, submissions]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {challenge && (currentLanguage === "vn" ? challenge?.title_vn : challenge?.title_en) || ""}
          | Tet Challenge - Vui xuân đón Tết
        </title>
      </Helmet>
      <div className=" w-full h-full min-h-screen">
        <BackgroundCoin className="relative w-full h-full min-h-screen">
          <div className="relative z-10 max-w-[550rem] mx-auto md:pt-[50rem] md:pb-0 px-[20rem] md:px-[10rem] pt-[100rem] pb-[150rem]">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file_target = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const blob = new Blob([reader.result as ArrayBuffer], {
                      type: file_target.type,
                    });
                    setFile(blob);
                  };
                  reader.readAsArrayBuffer(file_target);
                }
              }}
              ref={inputUploadRef}
              hidden
            />
            <div className="bg-gray-300 w-full aspect-[4/3] mb-[40rem] rounded-[10rem] flex items-center justify-center overflow-hidden">
              {(preview && (
                <img
                  className="w-full h-full object-contain"
                  src={preview as string}
                />
              )) || (
                <Camera
                  weight="fill"
                  className="w-[150rem] h-[150rem] md:w-[200rem] md:h-[200rem] opacity-35"
                />
              )}
            </div>
            <center>
              <UploadModal
                fileBlob={file}
                onSave={handleCropCompleted}
              ></UploadModal>
              <LunarButton
                className="font-[500]"
                variant={preview ? "default" : "primary"}
                onClick={handleOpenFile}
              >
                {preview ? t("common.edit") : t("common.upload_image")}
              </LunarButton>
            </center>
            <Typography.Paragraph className="text-center mt-[20rem] text-happy_box-red text-[16rem] md:text-[21rem]">
              {currentLanguage === "vn"
                ? challenge?.description_vn
                : challenge?.description_en}
            </Typography.Paragraph>
            <div className="flex justify-center gap-x-[30rem] pt-[20rem] md:pt-[100rem] pb-[80rem]">
              <LunarButton
                variant="primary"
                className="font-[500]"
                onClick={handleClickFinish}
                disabled={isUploading}
              >
                <div className="flex gap-x-[10rem] items-center">
                  {isUploading && (
                    <Loader2 className="animate-spin !w-[20rem] !h-[20rem] mr-[5rem]" />
                  )}
                  <span> {t("common.finish")}</span>
                </div>
              </LunarButton>
              <LunarButton className="font-[500]" onClick={backToHome}>
                {t("common.go_back")}
              </LunarButton>
            </div>
          </div>
          <img
            className="absolute z-1 top-[0%] left-0 md:w-[20%] w-[50%]"
            src={`${env.ASSET_URL}/happy-box/upload-backdrop-left-1.png`}
            alt="backdrop-left"
          />
          <img
            className="absolute z-1 top-[0%] right-0 md:w-[20%] w-[50%]"
            src={`${env.ASSET_URL}/happy-box/upload-backdrop-right-1.png`}
            alt="backdrop-left"
          />
          <img
            className="absolute z-1 bottom-0 left-0 w-[40%] md:w-[20%]"
            src={`${env.ASSET_URL}/happy-box/upload-backdrop-left-2.png`}
            alt="backdrop-left-2"
          />
          <img
            className="absolute z-1 bottom-0 right-0 w-[40%] md:w-[20%]"
            src={`${env.ASSET_URL}/happy-box/upload-backdrop-right-2.png`}
            alt="backdrop-left-2"
          />
        </BackgroundCoin>
      </div>
    </>
  );
};

Component.displayName = "Upload Page";
