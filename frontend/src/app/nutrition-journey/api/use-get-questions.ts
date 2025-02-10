import { WSENJQuestionExtended, WSENJQuestionResponse } from '@nutrition-journey/context/types';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from '@nutrition-journey/api/api.config';

const useGetQuestions = (skip?:boolean) => {
const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<{
    message: WSENJQuestionExtended[];
  }>(
    FRAPPE_APIS.GET_QUESTIONS.METHOD_STRING,
    undefined,
    !skip ? FRAPPE_APIS.GET_QUESTIONS.SWR_KEY : null,
    {} // options
  );
  

    return { questions: data?.message, isLoading,isValidating, error };
};

export default useGetQuestions;