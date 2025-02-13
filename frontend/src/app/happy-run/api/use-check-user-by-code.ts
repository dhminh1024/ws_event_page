import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from './api.config';
import { HRUserInfo } from '../types/variables';

const useCheckUserByCode = () => {
const { call } = useFrappePostCall<{message: HRUserInfo }>(FRAPPE_APIS.GET_USER_BY_CODE.METHOD_STRING);
  
  return { getInfo: call };
};

export default useCheckUserByCode;