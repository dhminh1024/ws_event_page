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
      className={cn("bg-nj-mint/40", className)}
      // style={{
      //   backgroundImage: `url(${cleanPath(
      //     `${env.ASSET_URL}/happy-box/bg-coin.png`
      //   )})`,
      //   backgroundSize: "90rem",
      //   backgroundRepeat: "repeat",
      //   backgroundBlendMode: "overlay"
      // }}
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
      className={cn("bg-nj-red", className)}
      style={{
        backgroundImage: `url(${cleanPath(
          `${env.ASSET_URL}/happy-box/bg-cloud.png`
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
      className={cn("h-160", className)}
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
