
export interface WSEGSSettings{
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
	/**	Current Program : Link - WSE GS Program	*/
	current_program?: string
	/**	Email Sender : Data	*/
	email_sender?: string
	/**	Confirmation Email Template : Link - Email Template	*/
	confirmation_email_template?: string
	/**	Cancellation Email Template : Link - Email Template	*/
	cancellation_email_template?: string
	/**	Approval Email Template : Link - Email Template	*/
	approval_email_template?: string
}