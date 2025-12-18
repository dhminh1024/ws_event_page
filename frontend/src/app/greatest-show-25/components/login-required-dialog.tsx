import { type FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@atoms/dialog";
import Typography from "./typography";
import { useLocales } from "@/core/hooks/use-locales";
import { useFrappePostCall } from "frappe-react-sdk";
import { useGoogleLogin } from "@react-oauth/google";
import LogoPrimary from "@greatest-show-25/assets/images/logo-wellspring.webp";
import LogoJourney from "@greatest-show-25/assets/images/logo-hj.webp";
import LogoGS from "@greatest-show-25/assets/images/gs-logo.webp";

export interface LoginRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin?: () => void;
}

/**
 * Dialog component that prompts user to login when they try to vote without authentication.
 * Can be reused anywhere voting functionality requires authentication.
 */
export const LoginRequiredDialog: FC<LoginRequiredDialogProps> = ({
  open,
  onOpenChange,
  onLogin,
}) => {
  const { t } = useLocales();
  const [isLoading, setIsLoading] = useState(false);

  // API hooks
  const { call: saveUserAPI } = useFrappePostCall(
    "ws_event_page.api.event.greatest_show.social_auth.save_social_user"
  );

  // Google Login hook
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      try {
        console.log("📤 Google login success, getting user info...");

        // Get user info from Google using access token
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
            },
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error("Failed to get user info from Google");
        }

        const userInfo = await userInfoResponse.json();
        console.log("✅ User info retrieved:", userInfo.email);

        // Save user to database
        await saveUserAPI({
          email: userInfo.email,
          full_name: userInfo.name,
          provider: "google",
          provider_id: userInfo.sub, // Google user ID
          profile_picture: null,
        });

        console.log("✅ User saved to database");

        // Save only email to localStorage
        localStorage.setItem("gs25_social_user", userInfo.email);
        console.log("✅ Login successful!");

        // Close dialog
        onOpenChange(false);
        if (onLogin) onLogin();
      } catch (error) {
        console.error("❌ Google login failed:", error);
        alert(t("greatest_show_25.login_error"));
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("❌ Google login error:", error);
      alert(t("greatest_show_25.login_error"));
    },
    flow: "implicit",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] md:max-w-[700px] rounded-[10rem] md:rounded-[15rem] p-60 bg-gs25-background">
        <DialogHeader>
          <div className="flex justify-between gap-x-20 pb-40 md:pb-40">
            <div className="flex w-full h-160 md:h-200 gap-x-0 md:gap-x-20 items-center">
              <img
                src={LogoPrimary}
                className="h-full w-auto mr-20"
                alt="Wellspring Logo"
              />
              <img
                src={LogoJourney}
                className="h-[60%] w-auto"
                alt="Happy Journey Logo"
              />
            </div>
            <div className="flex items-center w-auto">
              <img
                src={LogoGS}
                className="h-auto w-600"
                alt="Logo The Greatest Show 25"
              />
            </div>
          </div>
          <DialogTitle className="text-gs25-primary uppercase font-extrabold text-center text-[12rem] md:text-[14rem]">
            {t("greatest_show_25.login_required_title")}
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <Typography.Paragraph className="text-gs25-secondary text-[10rem] md:text-[12rem] mb-80 md:mb-100">
            {t("greatest_show_25.login_required_message")}
          </Typography.Paragraph>
        </div>
        <div className="flex flex-col gap-20">
          <button
            onClick={() => login()}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-30 md:py-35 px-64 md:px-80 rounded-[8rem] border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-12 md:gap-16 text-[12rem] md:text-[14rem]"
          >
            <svg
              className="w-60 h-60 md:w-80 md:h-80 shrink-0"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="flex-1 text-center">
              {isLoading
                ? t("greatest_show_25.login_loading")
                : t("greatest_show_25.login_with_google")}
            </span>
            <div className="w-20 md:w-24 shrink-0"></div>
          </button>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gs25-secondary cursor-pointer hover:text-brand-honey transition-colors text-[11rem] md:text-[12rem] font-semibold"
          >
            {t("greatest_show_25.cancel_button")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
