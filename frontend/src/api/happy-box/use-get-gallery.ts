import { WSEHBChallengeExtended } from '@/app/happy-box/context/types';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from '../api.config';
import { WSEHBSubmissionExtend } from '@/types/WellspringEventPage/WSEExtend';

const useGetGallery = (skip?:boolean) => {
const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<{
    message: WSEHBSubmissionExtend[];
  }>(
    FRAPPE_APIS.HAPPY_BOX.GET_GALLERY.METHOD_STRING,
    undefined,
    !skip ? FRAPPE_APIS.HAPPY_BOX.GET_GALLERY.SWR_KEY : null,
    {} // options
  );
  

    return { gallery: data?.message, isLoading,isValidating, error };
};

export default useGetGallery;