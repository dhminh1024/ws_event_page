import { WSEHBChallengeExtended } from '@/app/happy-box/context/types';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from './api.config';
import { WSEHROrder } from '@/types/WellspringEventPage/WSEHROrder';

const useGetOrder = (id?:string,skip?:boolean) => {
const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<{
    message: WSEHROrder;
  }>(
    FRAPPE_APIS.GET_ORDER.METHOD_STRING,
    {
      order_id: id,
    },
    !skip ? `${FRAPPE_APIS.GET_ORDER.SWR_KEY}_${id}` : null,
    {} // options
  );
  

    return { order: data?.message, isLoading,isValidating, error };
};

export default useGetOrder;