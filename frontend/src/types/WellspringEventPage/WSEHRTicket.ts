
export interface WSEHRTicket{
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
	full_name?: string
	/**	Email : Data	*/
	email?: string
	/**	Wellspring Code : Data	*/
	wellspring_code?: string
	/**	Person : Link - SIS Person	*/
	person_id?: string
	/**	Department : Data	*/
	department?: string
	/**	School Class Title : Data	*/
	school_class_title?: string
	/**	Status : Select	*/
	status: "Pending Payment" | "Canceled" | "Paid" | "Refunded" | "Attended"
	/**	Ticket Type : Select	*/
	ticket_type: "Happy Run" | "Well-being"
	/**	Ticket Price : Currency	*/
	ticket_price?: number
	/**	Category : Select	*/
	category?: "Primary" | "Companion"
	/**	Distance : Select	*/
	distance: "2.5 km" | "5 km"
	/**	T-Shirt size : Select	*/
	shirt_size: "Size 1" | "Size 2" | "Size 3" | "Size 4" | "Size 5" | "Size 6" | "Size 7"
	/**	BIB : Data	*/
	bib?: string
}