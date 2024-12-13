import React from "react";
import { AuthWSCodeContext } from "./auth-ws-code-context";

export const useAuthWSCode = () => React.useContext(AuthWSCodeContext);
