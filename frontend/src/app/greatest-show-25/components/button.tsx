import React, { forwardRef } from "react";
import { Button, ButtonProps } from "@atoms/button";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";
import PrimaryButtonImage from "@greatest-show-25/assets/images/button.webp";
import SecondaryButtonImage from "@greatest-show-25/assets/images/button-2.webp";
export type PrimaryButtonProps = Omit<ButtonProps, "variant"> & {
  variant?: "primary" | "default";
};

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <Button
        // ref={ref as any}
        className={cn(
          "relative cursor-pointer text-white inline-flex  p-[20rem_20rem] h-104 md:h-184 uppercase leading-none text-[20rem] rounded-[6rem] md:rounded-[13rem] overflow-hidden shadow-[5rem_5rem_8rem_#0e0d0d83] bg-transparent! border-none outline-hidden",
          className
        )}
        style={{
          backgroundImage: `url(${PrimaryButtonImage})`,
          backgroundSize: "100% 100%",
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
export const SecondaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <Button
        // ref={ref as any}
        className={cn(
          "relative cursor-pointer text-white inline-flex  p-[20rem_20rem] h-104 md:h-184  leading-none text-[20rem] rounded-[6rem] md:rounded-[13rem] overflow-hidden bg-transparent! border-none outline-hidden",
          className
        )}
        style={{
          backgroundImage: `url(${SecondaryButtonImage})`,
          backgroundSize: "100% 100%",
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export const ThirdaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <Button
        // ref={ref as any}
        className={cn(
          "relative cursor-pointer text-white inline-flex  p-[20rem_20rem] h-104 md:h-184  leading-none text-[20rem] rounded-[6rem] md:rounded-[13rem] overflow-hidden bg-gs25-gradient-6! border-none outline-hidden",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);