import { HTMLAttributes, PropsWithChildren, forwardRef, type FC } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { SVGCustomRectangle } from "./svg";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { is } from "date-fns/locale";

export type DimondBlockProps = HTMLAttributes<HTMLDivElement> & {};

export const DimondBlock: FC<
  HTMLAttributes<HTMLDivElement> & PropsWithChildren
> = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & PropsWithChildren
>(({ className, children, ...props }, ref) => {
  const { isDesktop } = useResponsive();
  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-square w-full h-0  rotate-45",
        className
      )}
      {...props}
    >
      <SVGCustomRectangle
        radius={isDesktop ? 20 : 10}
        strokeSize={"0.2vw"}
        strokeDasharray={isDesktop? "20": "10"}
        className="absolute top-0 left-0 right-0 bottom-0 m-auto w-[90%] h-[90%]"
      />
      <div className="absolute w-full h-full -rotate-45 top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center">
        {children}
      </div>
    </div>
  );
});
