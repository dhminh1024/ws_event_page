import React, { forwardRef } from "react";
import { Button, ButtonProps } from "@atoms/button";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";
import PrimaryButtonImage from "@happy-run/assets/images/primary-button.webp";

export type PrimaryButtonProps = Omit<ButtonProps, "variant"> & {
  variant?: "primary" | "default";
};

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative text-[#803700] inline-flex px-[30rem] h-[26rem] md:h-[46rem] uppercase leading-[1] text-[20rem] rounded-[13rem] overflow-hidden shadow-[5rem_5rem_8rem_#0e0d0d83] !bg-transparent border-none outline-none",
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

PrimaryButton.displayName = "PrimaryButton"; // Cần thiết khi sử dụng forwardRef
