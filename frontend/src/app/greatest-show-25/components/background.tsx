import { HTMLAttributes, PropsWithChildren, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";
import styled from "styled-components";
import BackgroundImage from "@greatest-show-25/assets/images/bg.jpg";

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

export type BackgroundProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {};

export const BackgroundGradient: FC<BackgroundProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn("bg-gs25-background", className)}
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        // backgroundRepeat: "repeat",
        // backgroundBlendMode: "overlay"
      }}
    >
      {children}
    </div>
  );
};

export const BackgroundCloud: FC<BackgroundProps> = ({
  className,
  children,
}) => {
  return (
    <BackgroundCloudStyled
      className={cn("bg-happy_box-red", className)}
      style={{
        backgroundImage: `url(${cleanPath(
          `${env.ASSET_URL}/happy-box/bg-cloud.webp`
        )})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </BackgroundCloudStyled>
  );
};

export const GreekPattern: FC<BackgroundProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn("h-160", className)}
      style={{
        backgroundImage: `url(${cleanPath(
          `${env.ASSET_URL}/happy-box/greek-decor.webp`
        )})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </div>
  );
};
