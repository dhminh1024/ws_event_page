
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
	/**	VietQR URL : Data	*/
	vietqr_url: string
	/**	Account Number : Data	*/
	account_number: string
	/**	BIN number : Data	*/
	bin_number: string
	/**	Account Name : Data	*/
	account_name: string
	/**	Bank Short Name : Data	*/
	bank_short_name: string
}