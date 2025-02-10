import { useContext } from "react";
import { HBSubmissionsContext } from "./hb-submission-context";

export const useSubmissions = () => useContext(HBSubmissionsContext);
