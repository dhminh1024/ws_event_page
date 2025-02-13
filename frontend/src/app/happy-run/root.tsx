import { PropsWithChildren } from "react";
import { EVENT_PAGES } from "@/config/event-pages";
import GlobalStyle from "./global";
import { EventPageProvider } from "@/lib/event-page/event-page-provider";
import { HRSettingProvider } from "./context/hr-setting-provider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <EventPageProvider eventUrl={EVENT_PAGES.HAPPY_RUN.SITE_URL}>
      <HRSettingProvider>
        <GlobalStyle />
        {children}
      </HRSettingProvider>
    </EventPageProvider>
  );
}
