import { WSEHRTicket } from './WSEHRTicket'

export interface WSEHROrder{
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
	/**	Full Name : Data	*/
	full_name: string
	/**	Email : Data	*/
	email: string
	/**	Mobile Number : Data	*/
	mobile_number: string
	/**	Status : Select	*/
	status?: "Pending Payment" | "Canceled" | "Paid"
	/**	QR Payment Code : Attach Image	*/
	qr_payment_code?: string
	/**	Tickets : Table - WSE HR Ticket	*/
	tickets?: WSEHRTicket[]
	/**	Total Price : Currency	*/
	total_price?: number
	/**	Total Payment Pending : Currency	*/
	total_payment_pending?: number
	/**	Total Paid : Currency	*/
	total_paid?: number
}