import {
  forwardRef,
  HTMLAttributes,
  RefAttributes,
  useState,
  type FC,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { Input, InputProps } from "@atoms/input";
import { Button } from "@atoms/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    // console.log(showPassword)

    return (
      <div className={cn("relative", className)}>
        <Input
          {...props}
          ref={ref}
          className={cn("pr-12", className)}
          type={showPassword ? "text" : "password"}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute bottom-0 right-1 top-0 my-auto hover:bg-transparent hover:text-inherit"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    );
  }
);
