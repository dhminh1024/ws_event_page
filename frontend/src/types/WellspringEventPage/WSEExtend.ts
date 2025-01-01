import { WSEHBChallenge } from "./WSEHBChallenge"
import { WSEHBSubmission } from "./WSEHBSubmission"

export type WSEHBSubmissionExtend = Omit<WSEHBSubmission, "happy_box_challenge"> & {
    happy_box_challenge: WSEHBChallenge
}