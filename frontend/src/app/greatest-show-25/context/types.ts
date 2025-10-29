import { WSEHBChallenge } from "@/types/WellspringEventPage/WSEHBChallenge";
import { WSEHBSubmission } from "@/types/WellspringEventPage/WSEHBSubmission";
import { WSEHRSettings } from "@/types/WellspringEventPage/WSEHRSettings";

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

export interface HRSettingResponse{
  settings?: WSEHRSettings
}
