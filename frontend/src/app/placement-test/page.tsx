import { useLocales } from "@/core/hooks/use-locales";
import { useNavigate, useParams } from "react-router-dom";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import { useEffect } from "react";
import Typography from "./components/typography";
import { Calendar } from "./components/calendar";

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
        <div className="w-[90%] md:w-[70%] h-[90vh] m-auto bg-white rounded-[10rem] overflow-hidden">
          <div className="flex h-full w-full">
            <div className="basis-[25%] bg-slate-400"></div>
            <div className="basis-[50%] bg-slate-200">
              <Calendar
                mode="single"
                // selected={date}
                // onSelect={setDate}
                className="rounded-md border text-hr-primary"
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
