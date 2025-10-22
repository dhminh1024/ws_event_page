import { RegisterForm } from "../sections/register-form";
import TopPageImage from "@happy-run/assets/images/top-page.webp";
import { useEffect } from "react";

export const Component = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(event.variables);

  return (
    <div className="bg-hr-background overflow-hidden">
      {/* <Helmet>
        <title>
          {"Register ticket"} | {env.HAPPY_RUN.TITLE_PAGE}
        </title>
      </Helmet> */}
      <div className="pallette">
        <span className="text-hr-honey"></span>
        <span className="text-hr-ember"></span>
        <span className="text-brand-persian"></span>
      </div>
      <img src={TopPageImage} className="w-full" alt="Top Page" />
      <RegisterForm />
    </div>
  );
};

Component.displayName = "Register show";
