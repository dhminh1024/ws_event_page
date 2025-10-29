import { HTMLAttributes, PropsWithChildren, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import env from "@/config/env";

export type ScrollProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    scrollSize?: number;
    paddingContent?: number;
  };

const ScrollObject: FC<ScrollProps> = ({ scrollSize = 20, className }) => {
  return (
    <div
      className={cn(
        "absolute z-20 top-0 bottom-0 my-auto h-[105%] rounded-4xl bg-scroll",
        className
      )}
      style={{
        width: `${scrollSize}rem`,
      }}
    >
      <div className="absolute top-full left-0 right-0 mx-auto w-[80%] aspect-16/3 shadow-[inset_0rem_10rem_20rem_-10rem_#00000061] bg-scroll">
        <div className="absolute top-full left-0 right-0 mx-auto w-[80%] aspect-16/5 bg-scroll-golden rounded-2xl"></div>
      </div>
      <div className="absolute bottom-full left-0 right-0 mx-auto w-[80%] aspect-16/3 shadow-[inset_0rem_-10rem_20rem_-10rem_#00000061] bg-scroll">
        <div className="absolute bottom-full left-0 right-0 mx-auto w-[80%] aspect-16/5 bg-scroll-golden rounded-2xl"></div>
      </div>
    </div>
  );
};

export const LunarScroll: FC<ScrollProps> = ({
  scrollSize = 20,
  paddingContent = 20,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "relative w-full drop-shadow-[5rem_0rem_5rem_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <ScrollObject scrollSize={scrollSize} className="left-0 " />
      <ScrollObject scrollSize={scrollSize} className="right-0" />
      <div
        className={
          "relative z-10 bg-[#F5F8CE] border-y-happy_box-light_red border-y-[15rem]"
        }
        style={{
          borderWidth: `${paddingContent - 10}rem 0`,
          padding: `0 ${scrollSize}rem`,
        }}
      >
        <div
          className={cn(
            "relative overflow-hidden before:content-[''] after:content-['']",
            "before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:shadow-[0rem_0rem_80rem_30rem_#00000050] md:before:shadow-[0rem_0rem_80rem_40rem_#00000050]",
            "after:absolute  after:top-0 after:right-0 after:h-full after:w-0 after:shadow-[0rem_0rem_80rem_30rem_#00000050] md:after:shadow-[0rem_0rem_80rem_40rem_#00000050]"
          )}
        >
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
