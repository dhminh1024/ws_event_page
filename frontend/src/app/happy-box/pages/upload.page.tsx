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
import { CameraIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UploadModal } from "../components/upload-modal";
import useUploadImageChallenge from "@/api/happy-box/use-upload-image-challenge";
import { useNavigate, useParams } from "react-router-dom";
import { useSubmissions } from "@happy-box/context/use-submissions";
import { useSettings } from "@/lib/auth/settings/use-settings";
import { cleanPath } from "@/lib/utils/common";
import { useChallengeList } from "@happy-box/context/use-challenge-list";

export const Component = () => {
  const navigate = useNavigate();
  const { t } = useLocales();
  const params = useParams();
  const challengeId = params.id;
  const { default_homepage_url } = useSettings();
  const {challenges} = useChallengeList()
  const challenge = challenges.find(c => c.name === challengeId)
  const { submissions, refresh: refreshSubmissions } = useSubmissions();
  const inputUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<Blob | null>();
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { handleUpload } = useUploadImageChallenge();

  const handleClickFinish = async () => {
    if (challengeId && croppedImage) {
      await handleUpload(challengeId, croppedImage);
      refreshSubmissions()
      backToHome()
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
    navigate(cleanPath(default_homepage_url as string));
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

  return (
    <div className=" w-full h-full min-h-screen">
      <BackgroundCoin className="relative w-full h-full min-h-screen">
        <div className="max-w-[550rem] mx-auto pt-[50rem]">
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
            {preview && (
              <img
                className="w-full h-full object-contain"
                src={preview as string}
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
              {preview ? "Thay đổi ảnh" : "Tải ảnh lên"}
            </LunarButton>
          </center>
          <Typography.Paragraph className="text-center mt-[20rem] text-happy_box-red text-[21rem]">
            {challenge?.description}
          </Typography.Paragraph>
          <div className="flex justify-center gap-x-[30rem] pt-[100rem] pb-[80rem]">
            <LunarButton
              variant="primary"
              className="font-[500]"
              onClick={handleClickFinish}
            >
              Hoàn thành
            </LunarButton>
            <LunarButton className="font-[500]" onClick={backToHome}>Trở lại</LunarButton>
          </div>
        </div>
      </BackgroundCoin>
    </div>
  );
};

Component.displayName = "Upload Page";
