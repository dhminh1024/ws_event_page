export type WSEGSVotingSettings = {
  name: string;
  voting_enabled: 0 | 1;
  voting_start_datetime: string | null;
  voting_end_datetime: string | null;
  require_social_auth: 0 | 1;
  enable_facebook_login: 0 | 1;
  show_vote_counts: 0 | 1;
  votes_per_user: number;
  fraud_score_threshold: number;
  creation: string;
  modified: string;
  owner: string;
  modified_by: string;
};
