import { type FC } from "react";
import { useChallengeList } from "../context/use-challenge-list";

export type TodayChallengeSectionProps = {
  className?: string;
};

export const TodayChallengeSection: FC<TodayChallengeSectionProps> = ({
  className,
}) => {
  const { challenges } = useChallengeList();

  const todayChallenge = challenges.find((challenge) => challenge.isToday);

  return (
    <>
      <h1>TodayChallengeSection</h1>
      <div>
        <img src={todayChallenge?.thumbnail} />
        {todayChallenge?.title}
      </div>
    </>
  );
};
