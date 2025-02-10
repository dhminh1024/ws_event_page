import { useFrappeGetCall } from "frappe-react-sdk";
import React from "react";
import { WSENJQuestionContext } from "./questions-context";
import { WSENJQuestionExtended } from "./types";
import useGetQuestions from "../api/use-get-questions";

export const QuestionsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { questions, isLoading, isValidating } = useGetQuestions();

  return (
    <WSENJQuestionContext.Provider
      value={{ questions: questions || [] }}
    >
      {children}
    </WSENJQuestionContext.Provider>
  );
};
