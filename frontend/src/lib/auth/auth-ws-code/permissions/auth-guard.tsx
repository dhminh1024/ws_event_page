import { FC, ReactNode, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthWSCode } from "../use-auth-ws-code";

type AuthWSCodeProps = {
  children: ReactNode;
  redirectTo?: string;
};

const AuthWSCodeGuard: FC<AuthWSCodeProps> = ({ children, redirectTo }) => {
  const { isAuthenticated } = useAuthWSCode();
  const location = useLocation();

  const redirectToURL = useMemo(() => {
    const returnTo = new URLSearchParams({
      returnTo: location.pathname,
    }).toString();
    return `${redirectTo}?${returnTo}`;
  }, [location.pathname, redirectTo]);

  if (!isAuthenticated) {
    return <Navigate replace to={redirectToURL || "/"} />;
  }

  return <>{children}</>;
};

export default AuthWSCodeGuard;
