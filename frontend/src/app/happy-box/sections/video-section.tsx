import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { BackgroundCloud } from "../components/background";
import env from "@/config/env";
import Typography from "../components/typography";
import { differenceInDays, format } from "date-fns";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useChallengeList } from "../context/use-challenge-list";
import { useLocales } from "@/core/hooks/use-locales";
import { Firework } from "../components/firework";
import { useResponsive } from "@/core/hooks/use-reponsive";

export type VideoSectionProps = HTMLAttributes<HTMLDivElement> & {};

export const VideoSection: FC<VideoSectionProps> = ({ className }) => {
  const { t } = useLocales();
  const {isDesktop} = useResponsive();
  const event = useEventPageContext();
  const { challenges } = useChallengeList();

  return (
    <section className="relative">
      <BackgroundCloud className={cn("relative", className)}>
        <div className="relative z-10 px-[10rem]">
          <div className="relative aspect-[560/376] mx-auto w-[90%] md:w-[60%] pt-[30rem] md:pt-[80rem]">
            <iframe
              className="w-full h-full "
              width="560"
              height="472"
              src={event.variables?.video_url?.value}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="relative md:w-[80%] mx-auto my-[20rem] md:mt-[50rem]">
            {isDesktop && <img src={`${env.ASSET_URL}/happy-box/lunar-bar.aviff`} alt="" />}
            {!isDesktop && <img src={`${env.ASSET_URL}/happy-box/lunar-bar-mobile.avif`} alt="" />}
            <Typography.Paragraph className="m-0 leading-[1] w-full text-[12rem] md:text-[26rem] text-happy_box-light_yellow absolute top-[50%] left-0 text-center translate-y-[-50%] md:translate-y-[-60%]">
              <Typography.Text className="text-[12rem] md:text-[30rem] mx-[5rem] text-happy_box-honey">
                {t("happy_box.video_section_gift_description_1", {
                  number: event.variables?.gift_limit?.value,
                })}
              </Typography.Text>
              {t("happy_box.video_section_gift_description_2")}
              <span className="block md:hidden"></span>
              <Typography.Text className="text-[12rem] md:text-[30rem] mx-[5rem] text-happy_box-honey">
                {t("happy_box.video_section_gift_description_3", {
                  count: challenges?.length || 0,
                })}
              </Typography.Text>
              {t("happy_box.video_section_gift_description_4")}
            </Typography.Paragraph>
          </div>
          <div className="font-playlist text-center">
            <Typography.Paragraph className="text-[22rem] md:text-[50rem] text-happy_box-brick leading-[1]">
              {t("happy_box.video_section_countdown_description_1")}
              <Typography.Text className="text-white mx-[10rem] md:mx-[20rem] text-[40rem] md:text-[80rem]">
                {differenceInDays(new Date(env.HAPPY_BOX.DATE), new Date()) < 10
                  ? `0${differenceInDays(
                      new Date(env.HAPPY_BOX.DATE),
                      new Date()
                    )}`
                  : differenceInDays(new Date(env.HAPPY_BOX.DATE), new Date())}
              </Typography.Text>
              {t("happy_box.video_section_countdown_description_2")}
            </Typography.Paragraph>
            <Typography.Paragraph className="text-[22rem] md:text-[50rem] text-happy_box-brick">
              {t("happy_box.video_section_countdown_description_3")}
              <Typography.Text className="relative text-happy_box-light_yellow mx-[10rem] text-[22rem] md:text-[50rem]">
                {format(new Date(env.HAPPY_BOX.DATE), "dd/MM/yyyy")}
                <img className="absolute bottom-0 left-[50%] translate-y-[50%] translate-x-[-50%] w-[200%] max-w-none h-auto" src={`${env.ASSET_URL}/happy-box/light-effect.png`} alt="" />
              </Typography.Text>
              {t("happy_box.video_section_countdown_description_4")}
            </Typography.Paragraph>
          </div>
        </div>

        <img
          className="absolute z-1 top-0 md:top-[5%] left-0 md:w-[22%] w-[40%]"
          src={`${env.ASSET_URL}/happy-box/video-backdrop-left.png`}
          alt="backdrop-left"
        />
        <img
          className="absolute z-1 top-0 md:top-[5%] right-0 md:w-[22%] w-[40%]"
          src={`${env.ASSET_URL}/happy-box/video-backdrop-right.png`}
          alt="backdrop-left"
        />
        <img
          className="w-full"
          src={`${env.ASSET_URL}/happy-box/video-foreground.png`}
          alt="video-foreground"
        />
      </BackgroundCloud>
    </section>
  );
};
