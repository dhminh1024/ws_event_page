import { HTMLAttributes, PropsWithChildren, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";

export type BackgroundCoinProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {};

export const BackgroundCoin: FC<BackgroundCoinProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn("bg-happy_box-cream", className)}
      style={{
        backgroundImage: `url(${cleanPath(
          `${env.ASSET_URL}/happy-box/bg-coin.png`
        )})`,
        backgroundSize: "90rem",
        backgroundRepeat: "repeat",
        backgroundBlendMode: "overlay"
      }}
    >
      {children}
    </div>
  );
};

export const BackgroundCloud: FC<BackgroundCoinProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn("bg-happy_box-red", className)}
      style={{
        backgroundImage: `url(${cleanPath(
          `${env.ASSET_URL}/happy-box/bg-cloud.png`
        )})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </div>
  );
};

export const GreekPattern: FC<BackgroundCoinProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn("h-[40rem]", className)}
      style={{
        backgroundImage: `url(${cleanPath(
          `${env.ASSET_URL}/happy-box/greek-decor.png`
        )})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </div>
  );
};
