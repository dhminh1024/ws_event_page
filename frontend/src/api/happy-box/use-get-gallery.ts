import { WSEHBChallengeExtended } from '@/app/happy-box/context/types';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from '@happy-box/api/api.config';
import { WSESubmissionExtend } from '@/types/WellspringEventPage/WSEExtend';

const useGetGallery = (skip?:boolean) => {
const { data, isLoading, isValidating, error, mutate } = useFrappeGetCall<{
    message: WSESubmissionExtend[];
  }>(
    FRAPPE_APIS.GET_GALLERY.METHOD_STRING,
    undefined,
    !skip ? FRAPPE_APIS.GET_GALLERY.SWR_KEY : null,
    {} // options
  );
  

    return { gallery: data?.message, isLoading,isValidating, error };
};

export default useGetGallery;