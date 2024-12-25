import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";
import Typography from "./typography";

export type BoxChallengeProps = HTMLAttributes<HTMLDivElement> & {
  imageUrl?: string;
  challengeNumber: number;
  hightlight?: boolean;
};

export const BoxChallenge: FC<BoxChallengeProps> = ({
  challengeNumber,
  imageUrl,
  hightlight,
  className,
}) => {
  return (
    <div
      className={cn(
        "group/box relative bg-happy_box-red p-[8rem] inline-block text-center rounded-[14rem] overflow-hidden cursor-pointer",
        {
          "bg-gradient-to-r from-yellow-400 to-yellow-200  !text-happy_box-red":
            hightlight,
        },
        className
      )}
      style={
        (hightlight && {
          backgroundImage: `url(${cleanPath(
            `${env.ASSET_URL}/happy-box/box-golden-metalic.png`
          )})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }) ||
        {}
      }
    >
      {imageUrl && (
        <img
          className={cn(
            "absolute z-30 top-0 left-0 w-full h-full object-cover group-hover/box:scale-110 duration-1000 ease-out transition-all"
          )}
          src={imageUrl}
          alt="image-challenge"
        />
      )}

      <div
        className={cn(
          "absolute z-10 top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover group-hover/box:scale-110 duration-1000 ease-out transition-all",
          {
            "opacity-30": hightlight,
          }
        )}
        style={{
          backgroundImage: `url(${cleanPath(
            `${env.ASSET_URL}/happy-box/box-challenge-${challengeNumber}.png`
          )})`,
        }}
      ></div>
      <div
        className={cn("relative z-20 p-[12rem] ", {
          "border-[2px] border-happy_box-red rounded-[14rem] ": hightlight,
        })}
      >
        <Typography.Paragraph
          className={cn(
            "text-[80rem] mt-[50rem] mb-[20rem] font-playlist text-happy_box-honey",
            { "text-happy_box-red": hightlight }
          )}
        >
          Ngay {challengeNumber > 9 ? challengeNumber : `0${challengeNumber}`}
        </Typography.Paragraph>
        <Typography.Paragraph
          className={cn("mb-[20rem] text-[23rem] text-happy_box-light_yellow", {
            "text-happy_box-red": hightlight,
          })}
        >
          Bat dau tu nhung dieu cu
        </Typography.Paragraph>
      </div>
    </div>
  );
};
