import { FC, ReactNode, useMemo } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuthWSCode } from "../use-auth-ws-code";

type Props = {
  children: ReactNode;
  eventUrl: string;
};

const AuthWSCodeGuestGuard: FC<Props> = ({ children, eventUrl }) => {
  const { isAuthenticated } = useAuthWSCode();
  const [searchParams] = useSearchParams();

  const returnTo = useMemo(
    () => searchParams.get("returnTo") || `/${eventUrl}`,
    [searchParams, eventUrl]
  );

  if (isAuthenticated) {
    return <Navigate to={returnTo} replace />;
  }

  return <>{children}</>;
};

export default AuthWSCodeGuestGuard;
