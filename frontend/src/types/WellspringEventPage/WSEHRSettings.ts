
export interface WSEHRSettings{
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
	/**	Well-being Ticket Price : Currency	*/
	wellbeing_ticket_price: number
	/**	Email Sender : Data	*/
	email_sender: string
	/**	Happy Run Ticket Price : Currency	*/
	happy_run_ticket_price: number
}