import { PropsWithChildren } from "react";

import { AuthWSCodeProvider } from "@/lib/auth/auth-ws-code/auth-ws-code-provider";
import { EVENT_PAGES } from "@/config/event-pages";
import GlobalStyle from "./global";
import { EventPageProvider } from "@/lib/event-page/event-page-provider";
import { UserProvider } from "./context/user-provider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <EventPageProvider eventUrl={EVENT_PAGES.NUTRITION_JOURNEY.SITE_URL}>
      <UserProvider>
        <GlobalStyle />
        {children}
      </UserProvider>
    </EventPageProvider>
  );
}
