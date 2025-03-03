import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { FRAPPE_APIS } from './api.config';
import { StudentSimple } from '@/types/extends/WSEStudent';

const useGetStudentsInClass = (id?:string,skip?:boolean) => {
const { call } = useFrappePostCall<{
    message: StudentSimple[];
  }>(FRAPPE_APIS.GET_STUDENTS_IN_CLASS.METHOD_STRING);
  
  return { call };
};

export default useGetStudentsInClass;