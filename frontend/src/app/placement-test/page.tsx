import { useLocales } from "@/core/hooks/use-locales";
import { useNavigate, useParams } from "react-router-dom";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useEffect } from "react";
import Typography from "./components/typography";
import { Calendar } from "@atoms/calendar";

export const Component = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLocales();
  const params = useParams();
  const event = useEventPageContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(event.variables);

  return (
    <div className="bg-pt-background overflow-hidden h-[100vh]">
      <div className="flex justify-center items-center h-full">
        <div className="max-w-[90%] w-[1136px] h-[90vh] m-auto bg-white rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row h-full w-full">
            <div className="basis-[25%] bg-slate-400"></div>
            <div className="basis-[50%] bg-slate-200">
              <Calendar
                mode="single"
                // selected={date}
                // onSelect={setDate}
                className="rounded-md w-full border text-hr-primary"
              />
            </div>
            <div className="basis-[25%] bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

Component.displayName = "Placement Test Registration";
