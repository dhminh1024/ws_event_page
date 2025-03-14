import { useFrappePostCall } from "frappe-react-sdk";
import React, { useCallback, useEffect, useState } from "react";
import { AuthWSCodeContext } from "./auth-ws-code-context";
import { AuthWSCodeResponse } from "./types";
import { set } from "lodash";
import { useNavigate } from "react-router-dom";

interface AuthWSCodeProviderProps {
  children: React.ReactNode;
  eventUrl: string;
}

export const AuthWSCodeProvider: React.FC<AuthWSCodeProviderProps> = ({
  children,
  eventUrl,
}) => {
  const [user, setUser] = useState<AuthWSCodeResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { call } = useFrappePostCall(
    "ws_event_page.api.auth.login.login_with_wellspring_code"
  );
  const navigate = useNavigate();

  const login = useCallback(
    async (wellspringCode: string) => {
      console.log("login", wellspringCode);

      try {
        const response = await call({ wellspring_code: wellspringCode });
        setUser(response.message);
        setIsAuthenticated(true);
        localStorage.setItem("wse_wellspringCode", wellspringCode);
      } catch (error) {
        console.error("Login failed", error);
        return Promise.reject(error);
      }
    },
    [call]
  );

  useEffect(() => {
    const wellspringCode = localStorage.getItem("wse_wellspringCode");
    if (wellspringCode) {
      login(wellspringCode);
    }else{
      logout();
    }
  }, [login]);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("wse_wellspringCode");
    // navigate(`/${eventUrl}`);
  };

  return (
    <AuthWSCodeContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthWSCodeContext.Provider>
  );
};
