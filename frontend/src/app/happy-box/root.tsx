import { PropsWithChildren } from "react";

import { AuthWSCodeProvider } from "@/lib/auth/auth-ws-code/auth-ws-code-provider";
import { EVENT_PAGES } from "@/config/event-pages";
import GlobalStyle from "./global";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <AuthWSCodeProvider eventUrl={EVENT_PAGES.HAPPY_BOX.SITE_URL}>
      <GlobalStyle />
      {children}
    </AuthWSCodeProvider>
  );
}
