import { useContext } from "react";
import { WSENJQuestionContext } from "./questions-context";
export const useQuestions = () => useContext(WSENJQuestionContext);
