import React, { forwardRef } from "react";
import { Button, ButtonProps } from "@atoms/button";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";
import env from "@/config/env";

export type LunarButtonProps = Omit<ButtonProps,"variant"> & {
  variant?: "primary" | "default";
};

export const LunarButton = forwardRef<HTMLButtonElement, LunarButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative w-auto p-0 h-[46rem] uppercase font-tropen leading-[1] text-[20rem] rounded-[5rem] overflow-hidden shadow-[5rem_5rem_8rem_#0e0d0d83] !bg-transparent border-none outline-none",
          {
            "text-happy_box-red": variant === "primary",
            "text-happy_box-light_yellow": variant === "default",
          },
          className
        )}
        {...props}
      >
        <img
          className="w-full h-full"
          src={cleanPath(
            variant === "primary"
              ? `${env.ASSET_URL}/happy-box/golden-button.avif`
              : `${env.ASSET_URL}/happy-box/ruby-button.avif`
          )}
          alt="bg-button"
        />
        <span className="absolute">{children}</span>
      </Button>
    );
  }
);

LunarButton.displayName = "LunarButton"; // Cần thiết khi sử dụng forwardRef
