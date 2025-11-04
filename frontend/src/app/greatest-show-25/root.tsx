import { PropsWithChildren } from "react";
import { EVENT_PAGES } from "@/config/event-pages";
import GlobalStyle from "./global";
import { EventPageProvider } from "@/lib/event-page/event-page-provider";
import { HRSettingProvider } from "./context/hr-setting-provider";
import ReactGA from "react-ga4";
import { Toaster, toast } from "sonner";

const GAID = "G-ERLLHRP52G"; // Replace with your Google Analytics ID
ReactGA.initialize(GAID);
ReactGA.send({ hitType: "pageview" });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <EventPageProvider eventUrl={EVENT_PAGES.GREATEST_SHOW_25.SITE_URL}>
      <GlobalStyle />
      {children}
      <Toaster />
    </EventPageProvider>
  );
}
