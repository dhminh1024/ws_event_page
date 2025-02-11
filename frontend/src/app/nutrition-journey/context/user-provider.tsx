import { useFrappeGetCall } from "frappe-react-sdk";
import React, { useCallback, useEffect, useState } from "react";

import { WSENJStudent } from "./types";
import { UserContext } from "./user-context";
import useGetStudent from "../api/use-get-student";
import { removeAccents } from "@/lib/utils/common";

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [code, setCode] = useState<string>(
    localStorage.getItem("wse_wellspringCode") || ""
  );
  const [fullName, setFullName] = useState<string>(
    localStorage.getItem("wse_fullName") || ""
  );
  const [student, setStudent] = useState<WSENJStudent>();
  const { call } = useGetStudent(code, !code);

  const fetchStudent = useCallback(async () => {
    try {
      const data = await call({
        wellspring_code: code,
      });
      setStudent(data?.message);
      localStorage.setItem("wse_wellspringCode", code);
      localStorage.setItem("wse_fullName", data.message.fullName);
    } catch (error) {
      console.error(error);
    }
  }, [call, code]);

  useEffect(() => {
    if (code) {
      fetchStudent();
    }
  }, [code, fetchStudent]);

  // useEffect(() => {
  //   if (!fullName && student) {
  //     setFullName(student.fullName);
  //   }
  // }, [student, fullName]);

  return (
    <UserContext.Provider
      value={{
        user: student,
        code,
        isValid:
          student?.wellspringCode === code &&
          removeAccents(student.fullName) === removeAccents(fullName),
        fullName,
        setCode,
        setFullName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
