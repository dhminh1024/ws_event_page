import { PropsWithChildren } from "react";
import { EVENT_PAGES } from "@/config/event-pages";
import GlobalStyle from "./global";
import { EventPageProvider } from "@/lib/event-page/event-page-provider";
import { Toaster } from "sonner";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <EventPageProvider eventUrl={EVENT_PAGES.KINDERGARTEN_DEMO_DAY.SITE_URL}>
      <GlobalStyle />
      {children}
      <Toaster />
    </EventPageProvider>
  );
}
