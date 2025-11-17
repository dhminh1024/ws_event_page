import React, { forwardRef } from "react";
import { Button, ButtonProps } from "@atoms/button";
import { cn } from "@/core/utils/shadcn-utils";

export type PrimaryButtonProps = Omit<ButtonProps, "variant"> & {
  variant?: "primary" | "default";
};

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "relative cursor-pointer text-white inline-flex px-40 py-20 h-60 md:h-120 uppercase leading-none text-[5rem] md:text-[14rem] rounded-[5rem] overflow-hidden shadow-lg bg-kdd-primary hover:bg-kdd-primary-hover border-none transition-all duration-300",
          className
        )}
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
        className={cn(
          "relative cursor-pointer text-kdd-primary inline-flex px-40 py-20 h-60 md:h-120 leading-none text-[5rem] md:text-[14rem] rounded-[5rem] overflow-hidden bg-white hover:bg-gray-100 border-[0.625rem] border-kdd-primary transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
