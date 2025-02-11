
import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from './api.config';
import { WSENJStudent } from '../context/types';

const useGetStudent = (code?: string,skip?:boolean) => {
const { call } = useFrappePostCall<{
    message: WSENJStudent;
  }>(FRAPPE_APIS.GET_USER_INFO.METHOD_STRING);
  

    return { call };
};

export default useGetStudent;