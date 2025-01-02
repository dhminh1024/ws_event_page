import env from "@/config/env";
import { cn } from "@/core/utils/shadcn-utils";
import { cleanPath } from "@/lib/utils/common";

type Props = {
  className?: string;
  variant?: "default" | "white";
};

export default function Logo({ className, variant = "default" }: Props) {
  return (
    <img
      alt="Logo Wellspring SaiGon"
      className={cn("", className)}
      src={cleanPath(
        `${env.ASSET_URL}${
          variant == "default"
            ? `/static/ws-logo-full.png`
            : `/static/ws-logo-white.png`
        }`
      )}
    />
  );
}
