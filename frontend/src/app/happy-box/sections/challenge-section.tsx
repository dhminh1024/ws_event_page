import { type FC } from "react";
import { useChallengeList } from "../context/use-challenge-list";

export type ChallengeSectionProps = {
  className?: string;
};

export const ChallengeSection: FC<ChallengeSectionProps> = ({ className }) => {
  const { challenges } = useChallengeList();
  return (
    <>
      <h1>ChallengeSection</h1>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.name}>
            <img src={challenge.thumbnail} />
            {challenge.title}
          </li>
        ))}
      </ul>
    </>
  );
};
