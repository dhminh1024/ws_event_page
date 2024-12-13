import { createContext } from "react";
import { AuthWSCodeResponse } from "./types";

interface AuthContextType {
  user: AuthWSCodeResponse | null;
  isAuthenticated: boolean;
  login: (wellspringCode: string) => Promise<void>;
  logout: () => void;
}

export const AuthWSCodeContext = createContext<AuthContextType>(
  {} as AuthContextType
);
