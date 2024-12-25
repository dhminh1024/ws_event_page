import { type FC } from "react";
import { useChallengeList } from "../context/use-challenge-list";
import Typography from "../components/typography";
import { LunarScroll } from "../components/scroll";
import { BoxChallenge } from "../components/box-challenge";

export type ChallengeSectionProps = {
  className?: string;
};

export const ChallengeSection: FC<ChallengeSectionProps> = ({ className }) => {
  // const { challenges } = useChallengeList();
  return (
    <>
      <Typography.Heading
        level={2}
        className="flex gap-x-[20rem] justify-center pt-[60rem] pb-[20rem] font-playlist"
      >
        <Typography.Text className="text-happy_box-red font-medium text-[60rem]">
          Chào mừng WISer
        </Typography.Text>
        <Typography.Text className="text-happy_box-honey font-medium text-[60rem]">
          Nguyễn Văn A
        </Typography.Text>
      </Typography.Heading>
      <LunarScroll scrollSize={30} className="max-w-[680rem] mx-auto">
        <div className="py-[10rem] px-[60rem]">
          <Typography.Paragraph className="text-center text-happy_box-red text-[20rem]">
            Không khí Tết rộn ràng, tràn ngập sắc xuân đã lan tỏa khắp
            Wellspring Saigon! Đây là lúc để mỗi WISer dừng lại một chút, nhìn
            lại chặng đường một năm đã qua, làm mới chính mình, lan tỏa yêu
            thương và tạo nên những kỷ niệm Tết thật ý nghĩa.
          </Typography.Paragraph>
        </div>
      </LunarScroll>
      <div className="py-[30rem] flex flex-col gap-[10rem] max-w-[795rem] mx-auto">
        <Typography.Paragraph className="text-center text-happy_box-red text-[21rem]">
          Các WISers đã sẵn sàng “bung xõa” với 6 Thử Thách Ngày Tết chưa? - Nơi
          lưu giữ từng khoảnh khắc rực rỡ, đậm chất tinh thần Lễ hội Mùa Xuân
          2025 - Nhà là Tết Lớn trong Tim!
        </Typography.Paragraph>
        <Typography.Paragraph className="text-center text-happy_box-red text-[21rem]">
          Hãy chuẩn bị những khoảnh khắc đẹp nhất và cùng nhau chào đón một mùa
          Tết thật đáng nhớ.
        </Typography.Paragraph>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 max-w-[1136rem] mx-auto py-[20rem] gap-y-[30rem] gap-x-[50rem]">
        {Array.from({ length: 6 }).map((_, index) => (
          <BoxChallenge
            key={index + 1}
            imageUrl={index === 0 ? "https://via.placeholder.com/600x1000" : undefined}
            challengeNumber={index + 1}
            hightlight={index === 5}
          />
        ))}
      </div>
      {/* <ul>
        {challenges.map((challenge) => (
          <li key={challenge.name}>
            <img src={challenge.thumbnail} />
            {challenge.title}
          </li>
        ))}
      </ul> */}
    </>
  );
};
