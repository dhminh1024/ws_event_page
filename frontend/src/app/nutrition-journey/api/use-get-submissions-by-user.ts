
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from './api.config';
import { WSESubmissionExtend } from '@/types/WellspringEventPage/WSEExtend';


const useGetSubmissionByUser = (code?: string,skip?:boolean) => {
const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<{
    message: WSESubmissionExtend;
  }>(
    FRAPPE_APIS.GET_SUBMISSION_BY_CODE.METHOD_STRING,
    {
        wellspring_code: code
    },
    !skip ? `${FRAPPE_APIS.GET_SUBMISSION_BY_CODE.SWR_KEY}_${code}` : null,
    {} // options
  );
  

    return { submission: data?.message, isLoading,isValidating, error };
};

export default useGetSubmissionByUser;