import { EVENT_PAGES } from "@/config/event-pages";
import { AuthWSCodeProvider } from "@/lib/auth/auth-ws-code/auth-ws-code-provider";
import { EventPageProvider } from "@/lib/event-page/event-page-provider";
import { PropsWithChildren } from "react";
import SignInButton from "./components/sign-in-button";
import { Link } from "react-router-dom";
import Logo from "@atoms/logo";
import { useTheme } from "@/lib/shadcn/theme-provider";
import { HBChallengeListProvider } from "./context/hb-challenge-provider";

// import "./globals.css";
import { Helmet } from "react-helmet";
import { HBSubmissionListProvider } from "./context/hb-submission-provider";
import { ThankYouModal } from "./components/thank-you-modal";
import { useSubmissions } from "./context/use-submissions";
import { WelcomeModal } from "./components/welcome-modal";

export default function Layout({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return (
    <>
      {children}
    </>
  );
}
