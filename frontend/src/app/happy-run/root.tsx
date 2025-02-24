import { PropsWithChildren } from "react";
import { EVENT_PAGES } from "@/config/event-pages";
import GlobalStyle from "./global";
import { EventPageProvider } from "@/lib/event-page/event-page-provider";
import { HRSettingProvider } from "./context/hr-setting-provider";
import ReactGA from 'react-ga';

const GAID = "G-4HZM4JWRW3"
ReactGA.initialize(GAID);
ReactGA.pageview(window.location.pathname + window.location.search);

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
