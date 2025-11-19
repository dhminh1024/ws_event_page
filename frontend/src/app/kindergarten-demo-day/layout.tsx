import { PropsWithChildren } from "react";
import { useTheme } from "@/lib/shadcn/theme-provider";

export default function KindergartenDemoDayLayout({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {children}
    </div>
  );
}
