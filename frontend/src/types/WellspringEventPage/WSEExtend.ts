import { WSEHBChallenge } from "./WSEHBChallenge"
import { WSENJQuestion } from "./WSENJQuestion"
import { WSENJSubmission } from "./WSENJSubmission"
import { WSENJSubmissionImage } from "./WSENJSubmissionImage"

export type WSESubmissionImageExtend = Omit<WSENJSubmissionImage,"question"> & {
    question: WSENJQuestion
}

export type WSESubmissionExtend = Omit<WSENJSubmission, "images"> & {
    images:WSESubmissionImageExtend[]
}
