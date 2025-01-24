import { useContext } from "react";
import { HBChallengeContext } from "./hb-challenge-context";

export const useChallengeList = () => useContext(HBChallengeContext);
