import { PropsWithChildren } from "react";
import { useTheme } from "@/lib/shadcn/theme-provider";

export default function PlacementTestLayout({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return <>{children}</>;
}
