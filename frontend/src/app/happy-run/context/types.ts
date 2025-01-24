import { WSEHBChallenge } from "@/types/WellspringEventPage/WSEHBChallenge";
import { WSEHBSubmission } from "@/types/WellspringEventPage/WSEHBSubmission";

export interface WSEHBChallengeExtended extends WSEHBChallenge {
  isEnabled: boolean;
  isToday: boolean;
}

export interface WSEHBChallengeResponse {
  challenges: WSEHBChallengeExtended[];
}

export type WSEHBSubmissionExtend = Omit<WSEHBSubmission, "happy_box_challenge"> & {
  happy_box_challenge: WSEHBChallenge
}

export interface WSEHBSubmissionResponse {
  submissions: WSEHBSubmissionExtend[];
  showThankYouModal: boolean;
  setShowThankYouModal: (value: boolean) => void;
  refresh: () => void;
}
