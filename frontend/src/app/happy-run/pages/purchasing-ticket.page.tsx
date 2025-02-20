import { useLocales } from "@/core/hooks/use-locales";
import { useNavigate, useParams } from "react-router-dom";
import { PurchasingForm } from "../sections/purchasing-form";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import TopPageImage from "@happy-run/assets/images/top-page.png";

export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const params = useParams();
  const event = useEventPageContext();

  // console.log(event.variables);

  return (
    <div className="bg-hr-background overflow-hidden">
      {/* <Helmet>
        <title>
          {"Purchasing ticket"} | {env.HAPPY_RUN.TITLE_PAGE}
        </title>
      </Helmet> */}
      <div className="pallette">
        <span className="text-hr-honey"></span>
        <span className="text-hr-ember"></span>
        <span className="text-brand-persian"></span>
      </div>
      <img src={TopPageImage} className="w-full" alt="Top Page" />
      <PurchasingForm />
    </div>
  );
};

Component.displayName = "Purchasing Ticket";
