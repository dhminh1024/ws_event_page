import { use, type FC } from "react";
import { useChallengeList } from "@happy-box/context/use-challenge-list";
import Typography from "@happy-box/components/typography";
import { LunarScroll } from "@happy-box/components/scroll";
import { BoxChallenge } from "@happy-box/components/box-challenge";
import { useLocales } from "@/core/hooks/use-locales";
import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import {
  differenceInDays,
  differenceInMilliseconds,
  differenceInMinutes,
  format,
  isSameDay,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import { WSEHBChallengeExtended } from "@happy-box/context/types";
import { useSubmissions } from "@happy-box/context/use-submissions";
import env from "@/config/env";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { ThankYouModal } from "../components/thank-you-modal";
import { cleanPath } from "@/lib/utils/common";
import { EVENT_PAGES } from "@/config/event-pages";
import { nl2br } from "../utils/ultils";
import { cn } from "@/core/utils/shadcn-utils";
import { useEventPageContext } from "@/lib/event-page/use-event-page";

export type ChallengeSectionProps = {
  className?: string;
};

export const ChallengeSection: FC<ChallengeSectionProps> = ({ className }) => {
  const { user } = useAuthWSCode();
  const event = useEventPageContext();
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();

  const { t, currentLanguage } = useLocales();

  // const handleClickChallenge = (challenge: WSEHBChallengeExtended) => {
  //   const disabled =
  //     differenceInMilliseconds(new Date(challenge.release_date), new Date()) >
  //     0;
  //   if (!disabled) {
  //     console.log("click challenge");
  //     navigate(
  //       cleanPath(`/${EVENT_PAGES.nutritional_journey.SITE_URL}/upload/${challenge.name}`)
  //     );
  //   }
  // };

  return (
    <section className="relative pb-[60rem]">
      <div className="relative z-10 px-[20rem]">
        <Typography.Heading
          level={2}
          className="flex flex-col gap-x-[20rem] items-center justify-center pt-[30rem] md:pt-[60rem] pb-[0rem] md:pb-[20rem] font-playlist"
        >
          <Typography.Text className="text-happy_box-red font-medium text-[28rem] md:text-[80rem] leading-[1.5]">
            {t("nutritional_journey.title")}
          </Typography.Text>
          <Typography.Text className="text-happy_box-brick font-medium text-[28rem] md:text-[30rem] leading-[1.5]">
            {t("nutritional_journey.campaign_name")}
          </Typography.Text>
        </Typography.Heading>
      </div>
      <div className="flex flex-col gap-y-[20rem]">
        <div className=" text-left p-[5rem]">
          <div className="container">
            <Typography.Heading
              level={2}
              className="font-normal text-[28rem] text-happy_box-red underline bg-happy_box-light_yellow/50 px-[20rem]"
            >
              {t("nutritional_journey.heading_1")}
            </Typography.Heading>
          </div>
        </div>
        <div className="container flex flex-col pl-[40rem]">
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛ {event.variables.target_desc_1_vn?.value}
          </Typography.Text>
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛ {event.variables.target_desc_2_vn?.value}
          </Typography.Text>
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛ {event.variables.target_desc_3_vn?.value}
          </Typography.Text>
        </div>
      </div>
      <div className="flex flex-col gap-y-[20rem] mt-[40rem]">
        <div className=" text-left p-[5rem]">
          <div className="container">
            <Typography.Heading
              level={2}
              className="font-normal text-[28rem] text-happy_box-red underline bg-happy_box-light_yellow/50 px-[20rem]"
            >
              {t("nutritional_journey.heading_2")}
            </Typography.Heading>
          </div>
        </div>
        <div className="container flex flex-col gap-y-[10rem] pl-[40rem]">
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛{" "}
            <span className="underline">
              {t("nutritional_journey.sub_heading_2_1")}
            </span>
            :
            <span className="ml-[5rem]">
              {t("common.from_d_to_d", {
                from:
                  event.variables.time_from?.value &&
                  format(
                    new Date(event.variables.time_from?.value),
                    "dd-MM-yyyy"
                  ),
                to:
                  event.variables.time_to?.value &&
                  format(
                    new Date(event.variables.time_to?.value),
                    "dd-MM-yyyy"
                  ),
              })}
            </span>
          </Typography.Text>
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛{" "}
            <span className="underline">
              {t("nutritional_journey.sub_heading_2_2")}
            </span>
            :
          </Typography.Text>
          <div className="flex flex-col pl-[25rem]">
            <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
              ☆ {event.variables.how_to_join_desc_1_vn?.value}
            </Typography.Text>
            <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
              ☆ {event.variables.how_to_join_desc_2_vn?.value}
            </Typography.Text>
          </div>
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛{" "}
            <span className="underline">
              {t("nutritional_journey.sub_heading_2_3")}
            </span>
            :
            <span className="ml-[5rem]">
              {event.variables.submit_photos_desc_vn?.value}
            </span>
          </Typography.Text>
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛{" "}
            <span className="underline">
              {t("nutritional_journey.sub_heading_2_4")}
            </span>
            :
            <span className="ml-[5rem]">
              {event.variables.submit_photos_desc_vn?.value}
            </span>
          </Typography.Text>
          <div className="flex flex-col pl-[25rem]">
            <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
              ☆ {event.variables.criteria_desc_1_vn?.value}
            </Typography.Text>
            <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
              ☆ {event.variables.criteria_desc_2_vn?.value}
            </Typography.Text>
            <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
              ☆ {event.variables.criteria_desc_3_vn?.value}
            </Typography.Text>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-[20rem] mt-[40rem]">
        <div className=" text-left p-[5rem]">
          <div className="container">
            <Typography.Heading
              level={2}
              className="font-normal text-[28rem] text-happy_box-red underline bg-happy_box-light_yellow/50 px-[20rem]"
            >
              {t("nutritional_journey.heading_3")}
            </Typography.Heading>
          </div>
        </div>
        <div className="container flex flex-col gap-y-[10rem] pl-[40rem]">
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛ {event.variables.reward_1_vn?.value}
          </Typography.Text>
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛ {event.variables.reward_2_vn?.value}
          </Typography.Text>
          <Typography.Text className="text-happy_box-red font-medium text-[20rem]">
            ☛ {event.variables.reward_3_vn?.value}
          </Typography.Text>
        </div>
      </div>
      <div className="relative z-10 px-[20rem]">
        {/* <Typography.Heading
          level={2}
          className="flex flex-col md:flex-row gap-x-[20rem] items-center justify-center pt-[30rem] md:pt-[60rem] pb-[0rem] md:pb-[20rem] font-playlist"
        >
          <Typography.Text className="text-happy_box-red font-medium text-[28rem] md:text-[60rem] leading-[1.5]">
          {t("nutritional_journey.welcome")}
          </Typography.Text>
          <Typography.Text className="text-happy_box-honey font-medium text-[28rem] md:text-[60rem]">
            {user?.userData.fullName}
          </Typography.Text>
        </Typography.Heading> */}

        {/* <div className="grid grid-cols-2 md:grid-cols-3 max-w-[1136rem] mx-auto py-[20rem] gap-y-[15rem] md:gap-y-[30rem] gap-x-[10rem] md:gap-x-[50rem]">
          {challenges.map((c, index) => (
            <BoxChallenge
              key={index + 1}
              imageUrl={
                (submissions &&
                  submissions.find((s) => s.happy_box_challenge.name === c.name)
                    ?.image) ||
                undefined
              }
              thumbnail={c.thumbnail}
              title={currentLanguage === "vn" ? c.title_vn : c.title_en}
              challengeNumber={index + 1}
              hightlight={index === 5}
              disabled={
                differenceInMilliseconds(new Date(c.release_date), new Date()) >
                0
              }
              onClick={() => handleClickChallenge(c)}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};
