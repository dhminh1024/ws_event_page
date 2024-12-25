import { EVENT_PAGES } from "@/config/event-pages";
import { AuthWSCodeProvider } from "@/lib/auth/auth-ws-code/auth-ws-code-provider";
import { EventPageProvider } from "@/lib/event-page/event-page-provider";
import { PropsWithChildren } from "react";
import SignInButton from "./components/sign-in-button";
import { Link } from "react-router-dom";
import Logo from "@atoms/logo";
import { useTheme } from "@/lib/shadcn/theme-provider";
import { HBChallengeListProvider } from "./context/hb-challenge-provider";

import "./globals.css";
import { Helmet } from "react-helmet-async";

export default function HappyBoxLayout({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return (
    <>

      <AuthWSCodeProvider eventUrl={EVENT_PAGES.HAPPY_BOX.SITE_URL}>
        <EventPageProvider eventUrl={EVENT_PAGES.HAPPY_BOX.SITE_URL}>
          <HBChallengeListProvider>
            
            {/* <nav className="flex justify-between">
              <Logo
                className="w-[100rem]"
                variant={theme === "light" ? "default" : "white"}
              />
              <Link to="/happy-box">Home Page</Link>
              <Link to="/happy-box/challenge">Challenge Page</Link>
              <Link to="/happy-box/album">Album Page</Link>
              <SignInButton />
            </nav> */}
            {children}
          </HBChallengeListProvider>
        </EventPageProvider>
      </AuthWSCodeProvider>
    </>
  );
}
