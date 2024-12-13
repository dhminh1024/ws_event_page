import { useContext } from "react";
import { EventPageContext } from "./event-page-context";

export const useEventPageContext = () => useContext(EventPageContext);
