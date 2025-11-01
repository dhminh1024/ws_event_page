import { RegisterForm } from "../sections/register-form";
import LogoPrimary from "@greatest-show-25/assets/images/logo-wellspring.png";
import LogoJourney from "@greatest-show-25/assets/images/logo-hj.png";
import GSLogo from "@greatest-show-25/assets/images/gs-logo.webp";
import { useEffect } from "react";
import { BackgroundGradient } from "../components/background";

export const Component = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(event.variables);

  return (
    <BackgroundGradient>
      <div className="overflow-hidden">
        <div className="px-[3%]">
          <div className="flex items-center justify-between my-[20rem] h-[70rem] md:h-[200rem]">
            <div className="flex h-[90%] items-center">
              <img
                src={LogoPrimary}
                className="h-full w-auto mr-[20rem]"
                alt="Wellspring Logo"
              />
              <img
                src={LogoJourney}
                className="h-[60%] w-auto"
                alt="Happy Journey Logo"
              />
            </div>
            <img src={GSLogo} className="h-full w-auto" alt="GS 2025 Logo" />
          </div>
        </div>
        <RegisterForm />
      </div>
    </BackgroundGradient>
  );
};

Component.displayName = "Register show";
