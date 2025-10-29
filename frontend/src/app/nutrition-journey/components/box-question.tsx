import { HTMLAttributes, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";
import Typography from "./typography";
import { useLocales } from "@/core/hooks/use-locales";

export type BoxQuestionProps = HTMLAttributes<HTMLDivElement> & {
  imageUrl?: string;
  title?: string;
  sequenceNumber: number;
  hightlight?: boolean;
  disabled?: boolean;
};

export const BoxQuestion: FC<BoxQuestionProps> = ({
  sequenceNumber,
  imageUrl,
  title,
  hightlight,
  className,
  disabled,
  ...props
}) => {
  const { t } = useLocales();
  return (
    <div
      className={cn(
        "group/box aspect-4/3  relative bg-nj-orange/10 inline-block text-center rounded-[5rem] md:rounded-[14rem]",
        {
          "grayscale-[0.6] opacity-40": disabled,
          "cursor-pointer": !disabled,
        },
        className
      )}
      style={
        (hightlight && {
          backgroundImage: `url(${cleanPath(
            `${env.ASSET_URL}/happy-box/box-golden-metalic.png`
          )})`,
          backgroundSize: "135%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }) ||
        {}
      }
      {...props}
    >
      <div className="relative p-16 md:p-32 rounded-[5rem] md:rounded-[14rem] overflow-hidden w-full h-full">
        {imageUrl && (
          <img
            className={cn(
              "absolute z-30 top-0 left-0 w-full h-full object-cover duration-1000 ease-out transition-all",
              {
                "group-hover/box:scale-110": !disabled,
              }
            )}
            src={imageUrl}
            alt="image-challenge"
          />
        )}

        {/* <div
          className={cn(
            "absolute z-10 top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover duration-1000 ease-out transition-all",
            {
              "opacity-30": hightlight,
              "group-hover/box:scale-110": !disabled,
            }
          )}
          style={{
            backgroundImage: `url(${thumbnail && cleanPath(thumbnail)})`,
          }}
        ></div> */}
        <div
          className={cn(
            "relative z-20  p-48 w-full h-full flex flex-col justify-center items-center",
            {
              " border-2 border-nj-orange rounded-[5rem] md:rounded-[14rem] ":
                hightlight,
            }
          )}
        >
          <Typography.Paragraph
            className={cn(
              "text-[30rem] md:text-[50rem] md:mt-200 mb-0 md:mb-80 font-bold font-sans text-nj-blue/70",
              { "text-nj-orange": hightlight }
            )}
          >
            {t("common.image_n", {
              number: sequenceNumber,
            })}
          </Typography.Paragraph>
          <Typography.Paragraph
            className={cn(
              "md:mb-80 text-[12rem] md:text-[23rem] text-nj-light_yellow",
              {
                "text-nj-orange": hightlight,
              }
            )}
          >
            {title}
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};
