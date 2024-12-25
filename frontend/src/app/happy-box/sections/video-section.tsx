import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { BackgroundCloud } from "../components/background";
import env from "@/config/env";
import Typography from "../components/typography";
import {
  differenceInDays,
  format,
  formatDistanceToNow,
  formatDuration,
} from "date-fns";

export type VideoSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const VideoSection: FC<VideoSectionProps> = ({ className }) => {
  return (
    <BackgroundCloud className={cn("", className)}>
      <div className="p-[60rem]">
        <iframe
          className="w-[60%] mx-auto"
          width="560"
          height="472"
          src="https://www.youtube.com/embed/_66D0Z4UeOM?si=APB4bpd4mUlLLMvZ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="relative w-[80%] mx-auto my-[40rem]">
          <img src={`${env.ASSET_URL}/happy-box/lunar-bar.png`} alt="" />
          <Typography.Paragraph className="w-full text-[26rem] text-happy_box-light_yellow absolute top-[50%] left-0 text-center translate-y-[-60%]">
            <Typography.Text className="text-[30rem] mx-[5rem] text-happy_box-honey">
              15 WISer
            </Typography.Text>
            tham gia hoàn thành
            <Typography.Text className="text-[30rem] mx-[5rem] text-happy_box-honey">
              đủ 6 thử thách
            </Typography.Text>
            sẽ nhận quà từ Ban chương trình.
          </Typography.Paragraph>
        </div>
        <div className=" font-playlist text-center">
          <Typography.Paragraph className="text-[50rem] text-happy_box-brick">
            Chỉ còn
            <Typography.Text className="text-white mx-[20rem] text-[80rem]">
              {differenceInDays(new Date(env.HAPPY_BOX.DATE), new Date()) < 10
                ? `0${differenceInDays(
                    new Date(env.HAPPY_BOX.DATE),
                    new Date()
                  )}`
                : differenceInDays(new Date(env.HAPPY_BOX.DATE), new Date())}
            </Typography.Text>
            ngày nữa thôi,
          </Typography.Paragraph>
          <Typography.Paragraph className="text-[50rem] text-happy_box-brick">
            Hẹn gặp lại các WISers tại lễ hội mùa xuân vào ngày
            <Typography.Text className="text-happy_box-light_yellow mx-[10rem] text-[50rem]">
              {format(new Date(env.HAPPY_BOX.DATE), "dd/MM/yyyy")}
            </Typography.Text>{" "}
            sắp tới!
          </Typography.Paragraph>
        </div>
      </div>
      <img className="w-full" src={`${env.ASSET_URL}/happy-box/video-foreground.png`} alt="video-foreground" />
    </BackgroundCloud>
  );
};
