import { HTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { cn } from "@/core/utils/shadcn-utils";
import SectionHeadingImage from "@happy-run/assets/images/section-heading.webp";
import Typography from "@/app/happy-box/components/typography";

export type SectionHeadingProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {};

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Typography.Heading
        level={2}
        className={cn(
          "inline-block px-[100rem] py-[8rem] text-white font-black text-[35rem] uppercase",
          className
        )}
        style={{
          backgroundImage: `url(${SectionHeadingImage})`,
          backgroundSize: "100% 100%",
        }}
        ref={ref}
        {...props}
      >
        {children}
      </Typography.Heading>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
