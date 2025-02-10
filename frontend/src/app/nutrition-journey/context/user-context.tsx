import { createContext } from "react";
import { WSENJStudent } from "./types";

export interface WSEUser {
  user?: WSENJStudent;
  fullName: string;
  code: string;
  isValid: boolean;
  setCode: (code: string) => void;
  setFullName: (fullName: string) => void;
}

export const UserContext = createContext<WSEUser>({} as WSEUser);
