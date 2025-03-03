import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { FRAPPE_APIS } from './api.config';
import { StudentSimple } from '@/types/extends/WSEStudent';

const useGetStaffInDepartment = (id?:string,skip?:boolean) => {
const { call } = useFrappePostCall<{
    message: StudentSimple[];
  }>(FRAPPE_APIS.GET_STAFFS_IN_DEPARTMENT.METHOD_STRING);
  
  return { call };
};

export default useGetStaffInDepartment;