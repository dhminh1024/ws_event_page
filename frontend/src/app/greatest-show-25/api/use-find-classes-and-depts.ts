import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { FRAPPE_APIS } from './api.config';
import { ClassesAndDepts, ClassSimple, DeptSimple } from '@/types/extends/WSEClasses';
import { useLocales } from '@/core/hooks/use-locales';

const useFindClassesAndDepts = () => {
const { call } = useFrappePostCall<{
    message: ClassesAndDepts;
  }>(FRAPPE_APIS.FIND_SCHOOL_CLASSES_DEPARTMENT.METHOD_STRING);
  
  return { call };
};

export default useFindClassesAndDepts;