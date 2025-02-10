import { EVENT_PAGES } from "@/config/event-pages";
import { AuthWSCodeProvider } from "@/lib/auth/auth-ws-code/auth-ws-code-provider";
import { EventPageProvider } from "@/lib/event-page/event-page-provider";
import { PropsWithChildren } from "react";
import SignInButton from "./components/sign-in-button";
import { Link } from "react-router-dom";
import Logo from "@atoms/logo";
import { useTheme } from "@/lib/shadcn/theme-provider";
// import "./globals.css";
import { QuestionsProvider } from "./context/questions-provider";
import { SubmissionProvider } from "./context/submission-provider";

export default function Layout({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return (
    <QuestionsProvider>
      <SubmissionProvider>{children}</SubmissionProvider>
    </QuestionsProvider>
  );
}
