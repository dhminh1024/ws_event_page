import { WSEHBChallengeExtended } from '@/app/happy-box/context/types';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from '@happy-box/api/api.config';

const useGetChallenges = (skip?:boolean) => {
const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<{
    message: WSEHBChallengeExtended;
  }>(
    FRAPPE_APIS.GET_CHALLENGE_BY_ID.METHOD_STRING,
    undefined,
    !skip ? FRAPPE_APIS.GET_CHALLENGE_BY_ID.SWR_KEY : null,
    {} // options
  );
  

    return { challenge: data?.message, isLoading,isValidating, error };
};

export default useGetChallenges;