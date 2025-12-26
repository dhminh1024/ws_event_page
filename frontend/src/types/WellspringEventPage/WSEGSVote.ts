
export interface WSEGSVote{
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
	/**	GS Program : Link - WSE GS Program	*/
	gs_program: string
	/**	Finalist : Link - WSE GS Finalist	*/
	finalist: string
	/**	Voter : Link - WSE GS Users	*/
	voter: string
	/**	Voter Email : Data	*/
	voter_email: string
	/**	Voter Name : Data	*/
	voter_name?: string
	/**	Voted At : Datetime	*/
	voted_at?: string
	/**	IP Address : Data	*/
	ip_address?: string
	/**	User Agent : Small Text	*/
	user_agent?: string
	/**	Device Fingerprint : Data	*/
	device_fingerprint?: string
	/**	Referrer : Data	*/
	referrer?: string
	/**	Is Valid : Check	*/
	is_valid?: 0 | 1
	/**	Is Suspicious : Check	*/
	is_suspicious?: 0 | 1
	/**	Fraud Score : Int - 0-100, higher means more suspicious	*/
	fraud_score?: number
	/**	Fraud Reasons : Small Text - Reasons why this vote is marked as suspicious	*/
	fraud_reasons?: string
	/**	Reviewed By : Link - User	*/
	reviewed_by?: string
	/**	Reviewed At : Datetime	*/
	reviewed_at?: string
}