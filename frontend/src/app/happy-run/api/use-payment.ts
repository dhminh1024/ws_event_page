import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { useState, useEffect } from 'react';
import { FRAPPE_APIS } from './api.config';
import { HRUserInfo } from '../types/variables';
import { WSEHROrder } from '@/types/WellspringEventPage/WSEHROrder';

const usePayment = () => {
const { call } = useFrappePostCall<{message: WSEHROrder }>(FRAPPE_APIS.SEND_ORDER.METHOD_STRING);
  
  return { payment: call };
};

export default usePayment;