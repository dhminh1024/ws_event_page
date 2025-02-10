import {
  BackgroundCloud,
  BackgroundCoin,
} from "@nutrition-journey/components/background";
import env from "@/config/env";
import Typography from "@nutrition-journey/components/typography";
import { useLocales } from "@/core/hooks/use-locales";
import { useEffect, useRef, useState } from "react";
import { UploadModal } from "../components/upload-modal";
import { useNavigate, useParams } from "react-router-dom";
import { useSettings } from "@/lib/auth/settings/use-settings";
import { cleanPath } from "@/lib/utils/common";
import { Camera } from "phosphor-react";
import { Helmet } from "react-helmet";
import { EVENT_PAGES } from "@/config/event-pages";
import { Button } from "@atoms/button";
import { Loader2 } from "lucide-react";
import useUploadImageSubmission from "../api/use-upload-image-submission";
import { useUser } from "../context/use-user";
import useGetSubmissionsByUser from "../api/use-get-submissions-by-user";
import { useSubmission } from "../context/use-submission";

export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const params = useParams();
  const { user } = useUser();
  const questionId = params.qId;
  const image_sequence_number = params.index;

  const inputUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<Blob | null>();
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { submission, refresh: refreshSubmission } = useSubmission();
  const { handleUpload } = useUploadImageSubmission();
  const [isUploading, setIsUploading] = useState(false);

  const submissionTarget = submission?.images?.find(
    (i) =>
      i.question.name === questionId &&
      Number(i.sequence_number.split(".")[1]) === Number(image_sequence_number)
  );

  console.log(submissionTarget);

  const handleClickFinish = async () => {
    const isValid = questionId && image_sequence_number && user && croppedImage;
    if (isValid) {
      try {
        setIsUploading(true);
        await handleUpload(
          user.wellspringCode,
          questionId,
          Number(image_sequence_number),
          croppedImage
        );
        refreshSubmission();
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

  const handleOpenFile = () => {
    inputUploadRef.current?.click();
  };

  const handleCloseModal = () => {
    setFile(null);
  };

  const backToHome = () => {
    navigate(cleanPath(`/${EVENT_PAGES.NUTRITION_JOURNEY.SITE_URL}`));
  };

  useEffect(() => {
    if (submissionTarget && submissionTarget.image_url) {
      setPreview(submissionTarget.image_url);
    }
  }, [submissionTarget]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("common.upload_image")} | {env.NUTRITION_JOURNEY.TITLE_PAGE} - {t("nutritional_journey.campaign_name")}</title>
      </Helmet>
      <div className=" w-full h-full min-h-screen">
        <BackgroundCoin className="relative w-full h-full min-h-screen">
          <div className="relative z-10 max-w-[550rem] mx-auto md:pt-[30rem] md:pb-0 px-[20rem] md:px-[10rem] pt-[100rem] pb-[150rem]">
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
                onClose={handleCloseModal}
              ></UploadModal>
              <Button
                className="font-[500] bg-happy_box-brick text-[30rem] h-[30rem] p-[20rem] rounded-[5rem]"
                onClick={handleOpenFile}
              >
                {preview ? t("common.edit") : t("common.upload_image")}
              </Button>
            </center>

            <div className="flex justify-center gap-x-[30rem] pt-[20rem] md:pt-[20rem] pb-[80rem]">
              <Button
                className="font-[500] bg-happy_box-red/90 hover:bg-happy_box-red text-[30rem] h-[30rem] p-[20rem] rounded-[5rem]"
                onClick={handleClickFinish}
                disabled={isUploading}
              >
                <div className="flex gap-x-[10rem] items-center">
                  {isUploading && (
                    <Loader2 className="animate-spin !w-[20rem] !h-[20rem] mr-[5rem]" />
                  )}
                  <span> {t("common.send_image")}</span>
                </div>
              </Button>
              <Button
                variant={"outline"}
                className="border-happy_box-brick hover:bg-happy_box-brick/10 bg-transparent !text-happy_box-brick font-[500] text-[30rem] h-[30rem] p-[20rem] rounded-[5rem]"
                onClick={backToHome}
              >
                {t("common.go_back")}
              </Button>
            </div>
          </div>
        </BackgroundCoin>
      </div>
    </>
  );
};

Component.displayName = "Upload Page";
