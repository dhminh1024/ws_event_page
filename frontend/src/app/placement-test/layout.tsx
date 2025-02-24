import { PropsWithChildren } from "react";
import { useTheme } from "@/lib/shadcn/theme-provider";
import { PTSettingProvider } from "./context/pt-setting-provider";

export default function PlacementTestLayout({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return (
    <>
      <PTSettingProvider>{children}</PTSettingProvider>
    </>
  );
}
