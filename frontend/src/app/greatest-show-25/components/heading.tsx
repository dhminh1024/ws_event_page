import { HTMLAttributes, PropsWithChildren, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import Typography from "./typography";
import NonLaPart1 from "@greatest-show-25/assets/images/non-la-part-1.png";
import NonLaPart2 from "@greatest-show-25/assets/images/non-la-part-2.png";
export type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  PropsWithChildren & {};

export const Heading: FC<HeadingProps> = ({ className, children }) => {
  return (
    <div className={cn("inline-block", className)}>
      <div className={cn("relative m-[43rem_12rem_32rem_12rem]", className)}>
        <Typography.Heading
          className={cn(
            "relative z-10  border-[#B454FE] text-white  font-black uppercase text-center outline-white  bg-gs25-gradient-1",
            "rounded-[3rem_8rem_3rem_8rem] border-[1.5rem] text-[14rem] outline-[3rem] px-[14rem] py-[3rem]", // Mobile
            "md:rounded-[8rem_15rem_8rem_15rem] md:border-[2.5rem] md:text-[24rem] md:text-[24rem] md:outline-[5rem] md:px-[40rem] md:py-[5rem]" //Desktop
          )}
          style={{
            transform: "skew(-30deg)",
          }}
          level={4}
        >
          <div
            className="w-full h-full "
            style={{
              textShadow: "1.5rem 1.5rem 2rem rgba(0, 0, 0, 0.7)",
              transform: "skew(30deg)",
            }}
          >
            {children}
          </div>
        </Typography.Heading>
        <div
          className="absolute z-5  w-full h-[125%] bg-gs25-gradient-2 rounded-[3rem_8rem_7rem_8rem] md:rounded-[8rem_15rem_8rem_15rem] bottom-[-18%] right-[-3%]"
          style={{
            transform: "skew(-30deg)",
          }}
        ></div>
        <img
          className={cn(
            "z-20 h-auto absolute",
            "w-[68rem] top-[-20rem] right-[-25rem]",
            "md:w-[112rem] md:top-[-34rem] md:right-[-45rem]"
          )}
          src={NonLaPart1}
          alt="Non La Part 1q"
        />
        <img
          src={NonLaPart2}
          alt="Non La Part 2"
          className={cn(
            "z-1 h-auto absolute",
            "w-[105rem] bottom-[-19rem] right-[-24rem]",
            "md:w-[177rem] md:bottom-[-33rem] md:right-[-45rem]"
          )}

        />
      </div>
    </div>
  );
};
