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

export type ChallengeSectionProps = {
  className?: string;
};

export const ChallengeSection: FC<ChallengeSectionProps> = ({ className }) => {
  const { user } = useAuthWSCode();
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { challenges } = useChallengeList();
  const { submissions } = useSubmissions();
  const { t, currentLanguage } = useLocales();

  const handleClickChallenge = (challenge: WSEHBChallengeExtended) => {
    const disabled =
      differenceInMilliseconds(new Date(challenge.release_date), new Date()) >
      0;
    if (!disabled) {
      console.log("click challenge");
      navigate(
        cleanPath(`/${EVENT_PAGES.HAPPY_BOX.SITE_URL}/upload/${challenge.name}`)
      );
    }
  };

  return (
    <section className="relative pb-160 md:pb-240 shadow-[inset_0rem_-10rem_35rem_-10rem_#000]">
      <div className="relative z-10 px-80">
        <Typography.Heading
          level={2}
          className="flex flex-col md:flex-row gap-x-80 items-center justify-center pt-120 md:pt-240 pb-0 md:pb-80 font-playlist"
        >
          <Typography.Text className="text-happy_box-red font-medium text-[28rem] md:text-[60rem] leading-normal">
            {t("happy_box.welcome_wiser")}
          </Typography.Text>
          <Typography.Text className="text-happy_box-honey font-medium text-[28rem] md:text-[60rem]">
            {user?.userData.fullName}
          </Typography.Text>
        </Typography.Heading>

        <LunarScroll
          scrollSize={isDesktop ? 35 : 15}
          className="max-w-2720 md:mx-auto mt-80 mb-40"
        >
          <div
            className={cn("px-80  py-20 md:py-40", {
              "md:px-212": currentLanguage === "vn",
              "md:px-180": currentLanguage === "en",
            })}
          >
            <Typography.Paragraph className="text-center text-happy_box-red text-[12rem] md:text-[20rem]">
              {t("happy_box.challenge_section_description_1")}
            </Typography.Paragraph>
          </div>
        </LunarScroll>

        <div className="py-40 md:py-120 flex flex-col gap-40 md:max-w-3320 mx-auto">
          <Typography.Paragraph
            className="text-center text-happy_box-red text-[12rem] md:text-[21rem]"
            style={{ whiteSpace: "pre-line" }}
          >
            <span>{t("happy_box.challenge_section_description_2_1")}</span>
            <span className="mx-16  text-happy_box-honey">
              {t("happy_box.challenge_section_description_2_2")}
            </span>
            <span>{t("happy_box.challenge_section_description_2_3")}</span>
          </Typography.Paragraph>
          <Typography.Paragraph className="text-center text-happy_box-red text-[12rem] md:text-[21rem]">
            {t("happy_box.challenge_section_description_3")}
          </Typography.Paragraph>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 max-w-4544 mx-auto py-80 gap-y-60 md:gap-y-120 gap-x-40 md:gap-x-200">
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
        </div>
      </div>
      <img
        className="absolute z-1 top-40 md:top-[12%] left-[-10%] w-[33%] animate-swing-left"
        src={`${env.ASSET_URL}/happy-box/challenge-backdrop-left.png`}
        alt="backdrop-left"
      />
      <img
        className="absolute z-1 top-40 md:top-[10%] right-[-10%] w-[32%] animate-swing-right"
        src={`${env.ASSET_URL}/happy-box/challenge-backdrop-right.png`}
        alt="backdrop-left"
      />
    </section>
  );
};
