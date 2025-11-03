import { PropsWithChildren } from "react";
import { useTheme } from "@/lib/shadcn/theme-provider";
import { useSmoothScroll } from "./hooks/use-smooth-scroll";

export default function HappyBoxLayout({ children }: PropsWithChildren) {
  const { theme } = useTheme();
  // Initialize smooth scroll
  useSmoothScroll({
    smooth: 1.5,
    effects: false,
    smoothTouch: true,
  });

  return <>{children}</>;
}
