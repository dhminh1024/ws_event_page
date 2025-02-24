import { useContext } from "react";
import { PTSettingContext } from "./pt-setting-context";

export const usePTSettings = () => useContext(PTSettingContext);
