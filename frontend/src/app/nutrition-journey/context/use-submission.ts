import { useContext } from "react";
import { SubmissionContext } from "./submission-context";

export const useSubmission = () => useContext(SubmissionContext);
