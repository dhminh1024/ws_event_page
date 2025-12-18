import { useFrappeGetCall, useFrappePostCall } from "frappe-react-sdk";
import { FRAPPE_APIS } from "../api/api.config";
import { WSEGSFinalist } from "@/types/WellspringEventPage/WSEGSFinalist";
import { useState } from "react";

interface VotingSettings {
  voting_enabled: 0 | 1;
  voting_start_datetime: string | null;
  voting_end_datetime: string | null;
  require_social_auth: 0 | 1;
  enable_facebook_login: 0 | 1;
  show_vote_counts: 0 | 1;
  votes_per_user: number;
  fraud_score_threshold: number;
  is_voting_active: boolean;
}

/**
 * Hook to fetch all active finalists for voting
 */
export const useFinalists = () => {
  const { data, isLoading, error, mutate } = useFrappeGetCall<{
    message: WSEGSFinalist[];
  }>(
    FRAPPE_APIS.GET_FINALISTS.METHOD_STRING,
    undefined,
    FRAPPE_APIS.GET_FINALISTS.SWR_KEY,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    finalists: data?.message || [],
    isLoading,
    error,
    refetch: mutate,
  };
};

/**
 * Hook to fetch voting settings and status
 */
export const useVotingSettings = () => {
  const { data, isLoading, error } = useFrappeGetCall<{
    message: VotingSettings;
  }>(
    FRAPPE_APIS.GET_VOTING_SETTINGS.METHOD_STRING,
    undefined,
    FRAPPE_APIS.GET_VOTING_SETTINGS.SWR_KEY,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    settings: data,
    isVotingActive: data?.message.is_voting_active ?? false,
    showVoteCount: data?.message.show_vote_counts === 1,
    isLoading,
    error,
  };
};

/**
 * Hook to cast a vote for a finalist
 * @param voterId - User ID or email to associate with the vote
 */
export const useCastVote = (voterId?: string) => {
  const [isVoting, setIsVoting] = useState(false);
  const [votingFinalistId, setVotingFinalistId] = useState<string | null>(null);
  const { call: castVoteAPI } = useFrappePostCall(
    FRAPPE_APIS.CAST_VOTE.METHOD_STRING
  );

  const castVote = async (finalistId: string, deviceFingerprint?: string) => {
    if (!voterId) {
      throw new Error("Voter ID is required to cast a vote");
    }

    setIsVoting(true);
    setVotingFinalistId(finalistId);

    try {
      await castVoteAPI({
        finalist_id: finalistId,
        voter_email: voterId,
        device_fingerprint: deviceFingerprint,
      });

      return { success: true };
    } catch (error) {
      console.error("Error casting vote:", error);
      throw error;
    } finally {
      setIsVoting(false);
      setVotingFinalistId(null);
    }
  };

  return {
    castVote,
    isVoting,
    votingFinalistId,
  };
};

/**
 * Hook to get user data including voting status
 * Combines user verification and vote checking in a single API call
 * @param voterEmail - User email to check
 */
export const useGetUser = (voterEmail?: string | null, skip?: boolean) => {
  const { data, isLoading, mutate } = useFrappeGetCall<{
    message: {
      user_exists: boolean;
      has_voted: boolean;
      voted_finalists: string[];
      user_data?: {
        email: string;
        full_name: string;
        facebook_user_id?: string;
        facebook_profile_picture?: string;
      };
      message?: string;
    };
  }>(
    FRAPPE_APIS.GET_USER.METHOD_STRING,
    {
      voter_email: voterEmail,
    },
    skip ? null : FRAPPE_APIS.GET_USER.SWR_KEY
  );

  return {
    userData: data?.message.user_data,
    voted: data?.message.voted_finalists || [],
    isLoading,
    mutate,
  };
};
