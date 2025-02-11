import { WSEHBChallengeExtended } from '@/app/happy-box/context/types';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from './api.config';
import { WSEHBSubmissionExtend } from '@/types/WellspringEventPage/WSEExtend';

const useGetSubmissionsByUser = (code?: string,skip?:boolean) => {
const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<{
    message: WSEHBSubmissionExtend[];
  }>(
    FRAPPE_APIS.GET_HB_SUBMISSIONS_BY_USER.METHOD_STRING,
    {
        wellspring_code: code
    },
    !skip ? `FRAPPE_APIS.GET_HB_SUBMISSIONS_BY_USER.SWR_KEY_${code}` : null,
    {} // options
  );
  

    return { submissions: data?.message, isLoading,isValidating, error };
};

export default useGetSubmissionsByUser;