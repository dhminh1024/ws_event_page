import { WSESubmissionExtend } from "@/types/WellspringEventPage/WSEExtend";
import { WSEHBChallenge } from "@/types/WellspringEventPage/WSEHBChallenge";
import { WSEHBSubmission } from "@/types/WellspringEventPage/WSEHBSubmission";
import { WSENJQuestion } from "@/types/WellspringEventPage/WSENJQuestion";

export interface WSENJQuestionExtended extends WSENJQuestion {
  
}

export interface WSENJQuestionResponse {
  questions: WSENJQuestionExtended[];
}

export interface WSESubmissionResponse {
  submission?: WSESubmissionExtend;

  refresh: () => void;
}



export interface WSENJStudent {
  fullName: string;
  personId: string;
  email?: string | null;
  wellspringCode: string;
  currentClass: string;
}