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
import { ChooseLetterModal } from "@happy-box/components/modal";
import { RadioGroup, RadioGroupItem } from "@atoms/radio-group";
import { Label } from "@atoms/label";
import { generateArrayWithRandomLetters } from "@happy-box/utils/ultils";
import { useLocales } from "@/core/hooks/use-locales";
import { FileInput, FileUploader, ImageSvgDraw } from "@molecules/uploader";
import { CameraIcon } from "lucide-react";

export const Component = () => {
  const { t } = useLocales();

  return (
    <div className=" w-full h-full min-h-screen">
      <BackgroundCoin className="relative w-full h-full min-h-screen">
        <div className="max-w-[550rem] mx-auto">
          <FileUploader
            // value={field.value}
            // onValueChange={field.onChange}
            dropzoneOptions={{
              accept: {
                "image/*": [".jpg", ".jpeg", ".png", ".gif"],
              },
              maxFiles: 3,
              maxSize: 1024 * 1024 * 4,
              multiple: true,
            }}
          >
            <FileInput className="mt-[100rem] mb-[40rem] bg-gray-300 w-full aspect-[4/3] p-[20rem] flex items-center justify-center">
              <div className="">
                <CameraIcon className="w-[200rem] h-[200rem] text-gray-500" />
              </div>
            </FileInput>
          </FileUploader>
          <center>
            <LunarButton variant="primary" className="font-[500]">
              Thêm hình
            </LunarButton>
            <LunarButton className="font-[500]">
              Chỉnh sửa
            </LunarButton>
          </center>
          <Typography.Paragraph className="text-center mt-[20rem] text-happy_box-red text-[21rem]">
            Dọn dẹp bàn học, xếp lại tủ đồ, hay viết ra những mục tiêu cá nhân
            cho năm mới. Hãy bắt đầu từ những thay đổi nhỏ để nói lời tạm biệt
            năm cũ và sẵn sàng chào đón một hành trình mới
          </Typography.Paragraph>
          <div className="flex justify-center gap-x-[30rem] pt-[100rem] pb-[80rem]">
            <LunarButton variant="primary" className="font-[500]">
              Hoàn thành
            </LunarButton>
            <LunarButton className="font-[500]">
              Trở lại
            </LunarButton>
          </div>
        </div>
      </BackgroundCoin>
    </div>
  );
};

Component.displayName = "Upload Page";
