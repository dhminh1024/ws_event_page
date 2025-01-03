import {
  BackgroundCloud,
  BackgroundCoin,
} from "@happy-box/components/background";

import env from "@/config/env";
import Typography from "@happy-box/components/typography";
import { Input } from "@atoms/input";
import { LunarButton } from "@happy-box/components/button";
import { ChooseLetterModal } from "@/app/happy-box/components/choose-letter-modal";

import { useLocales } from "@/core/hooks/use-locales";
import { useResponsive } from "@/core/hooks/use-reponsive";
import { useSignInForm } from "../hooks/use-sign-in-form";
import { useState } from "react";
import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { NotificationModal } from "../components/notification-modal";
import { LanguageSelector } from "../components/language-selector";

export const Component = () => {
  const { t } = useLocales();
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { user, login, logout, isAuthenticated } = useAuthWSCode();
  const { handleSubmit } = useSignInForm();
  const [studentCode, setStudentCode] = useState<string>("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<any>(false);
  const [openChooseLetterModal, setOpenChooseLetterModal] =
    useState<any>(false);

  const handleLogin = async () => {
    try {
      setIsRequesting(true);
      setError(false);
      await handleSubmit({ wellspringCode: studentCode });
      setOpenChooseLetterModal(true);
    } catch (error: any) {
      setError({
        title: t("notification.login_failed.heading"),
        description: error.exception.includes("Invalid code")
          ? t("notification.invalid_code.description")
          : t("notification.something_went_wrong.description"),
      });
    }
    setIsRequesting(false);
  };

  const handleConfirm = async (letter: string) => {
    if (letter === user?.userData.fullName.split(" ")?.pop()?.[0]) {
      navigate("/happy-box");
    } else {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error(error);
    }
    setOpenChooseLetterModal(false);
  };

  return (
    <div className=" w-full h-full min-h-screen">
      <Helmet>
        <title>
          {t("common.login_page")} | {env.HAPPY_BOX.TITLE_PAGE}
        </title>
      </Helmet>
      <NotificationModal
        open={!!error}
        title={error.title}
        description={error.description}
      />
      <BackgroundCoin className="relative w-full h-full min-h-screen">
        <img
          className="relative z-20 w-full select-none"
          src={
            isDesktop
              ? `${env.ASSET_URL}/happy-box/banner-login.webp`
              : `${env.ASSET_URL}/happy-box/banner-login-mb.png`
          }
          alt=""
        />
        <div className="absolute top-[7%] right-[5%] z-30 flex items-center gap-x-[20rem]">
          <Typography.Text className="hidden  md:inline text-[12rem] md:text-[16rem] text-happy_box-red">
            {t("common.language")}
          </Typography.Text>
          <LanguageSelector />
        </div>
        <BackgroundCloud className="relative z-30 md:shadow-[0_0rem_30rem_#000000] md:py-[50rem] gap-y-[20rem] p-[20rem] md:px-[100rem] flex flex-col md:flex-row justify-center items-center gap-x-[40rem]">
          <Typography.Text className="text-center uppercase text-[14rem] md:text-[23rem] font-tropen leading-[1] text-happy_box-light_yellow">
            {t("happy_box.enter_sign_in_code")}
          </Typography.Text>
          <Input
            className="text-[16rem] py-[2rem] md:text-[28rem] w-[70%] md:w-full tracking-[5rem] md:h-[56rem] flex-1 rounded-[5rem] text-center text-happy_box-red bg-white uppercase"
            placeholder="W000000"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
          />
          <LunarButton
            variant="primary"
            className="w-auto h-[34rem] md:h-[56rem] text-[16rem] md:text-[23rem]"
            disabled={isRequesting || !studentCode}
            onClick={handleLogin}
          >
            {t("common.sign_in")}
          </LunarButton>
        </BackgroundCloud>
      </BackgroundCoin>
      <ChooseLetterModal
        open={openChooseLetterModal}
        correctLetter={user?.userData.fullName.split(" ")?.pop()?.[0]}
        onConfirm={handleConfirm}
        onClosed={handleLogout}
      />
    </div>
  );
};

Component.displayName = "Login Page";
