
export interface WSEGSVotingSettings{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Voting Enabled : Check	*/
	voting_enabled?: 0 | 1
	/**	Voting Start Date/Time : Datetime	*/
	voting_start_datetime?: string
	/**	Voting End Date/Time : Datetime	*/
	voting_end_datetime?: string
	/**	Require Social Authentication : Check - Nếu tắt, cho phép vote bằng email đơn giản	*/
	require_social_auth?: 0 | 1
	/**	Enable Facebook Login : Check	*/
	enable_facebook_login?: 0 | 1
	/**	Show Vote Counts Publicly : Check	*/
	show_vote_counts?: 0 | 1
	/**	Votes Per User : Int - Currently only 1 is supported	*/
	votes_per_user?: number
	/**	Fraud Score Threshold : Int - Votes with fraud score >= this value will be automatically marked as suspicious (0-100)	*/
	fraud_score_threshold?: number
}