import { WSEHBChallenge } from "@/types/WellspringEventPage/WSEHBChallenge";

export interface WSEHBChallengeExtended extends WSEHBChallenge {
  isEnabled: boolean;
  isToday: boolean;
}

export interface WSEHBChallengeResponse {
  challenges: WSEHBChallengeExtended[];
}
