import { cn } from "@/core/utils/shadcn-utils";
import { useAuthWSCode } from "@/lib/auth/auth-ws-code/use-auth-ws-code";
import { Button } from "@atoms/button";
import { HTMLAttributes } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = HTMLAttributes<HTMLDivElement> & {};

export default function SignInButton({ className }: Props) {
  const { isAuthenticated, logout } = useAuthWSCode();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("sign-in", { state: { backgroundLocation: location } }); // Navigate to the modal route
    }
  };

  return (
    <Button
      className={cn("space-x-3", className)}
      onClick={handleClick}
      variant={isAuthenticated ? "destructive" : "default"}
    >
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </Button>
  );
}
