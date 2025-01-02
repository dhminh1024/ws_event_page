import { HTMLAttributes, PropsWithChildren, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";
import styled from "styled-components";

const BackgroundCloudStyled = styled.div`
  @keyframes cloud-floating {
    from {
      background-position: 0rem;
    }
    to {
      background-position: 1000rem;
    }
  }
  &{
    animation: cloud-floating 50s linear infinite;
  }
`

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
          `${env.ASSET_URL}/happy-box/bg-coin.avif`
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
    <BackgroundCloudStyled
      className={cn("bg-happy_box-red", className)}
      style={{
        backgroundImage: `url(${cleanPath(
          `${env.ASSET_URL}/happy-box/bg-cloud.avif`
        )})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </BackgroundCloudStyled>
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
          `${env.ASSET_URL}/happy-box/greek-decor.avif`
        )})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </div>
  );
};
