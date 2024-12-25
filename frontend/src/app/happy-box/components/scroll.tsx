import { HTMLAttributes, PropsWithChildren, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import env from "@/config/env";

export type ScrollProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    scrollSize?: number;
    paddingContent?: number;
  };

export const LunarScroll: FC<ScrollProps> = ({
  scrollSize = 20,
  paddingContent=20,
  className,
  children,
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      <img
        className="absolute top-0 left-0 h-full"
        style={{ maxWidth: `${scrollSize}rem` }}
        src={`${env.ASSET_URL}/happy-box/scroll.png`}
        alt=""
      />
      <img
        className="absolute top-0 right-0 h-full"
        style={{ maxWidth: `${scrollSize}rem` }}
        src={`${env.ASSET_URL}/happy-box/scroll.png`}
        alt=""
      />
      <div style={{padding:`${paddingContent}rem 0`}}>
        <div className="div bg-[#F5F8CE] border-y-happy_box-light_red border-y-[15rem] px-[20rem]">
          {children}
        </div>
      </div>
    </div>
  );
};
