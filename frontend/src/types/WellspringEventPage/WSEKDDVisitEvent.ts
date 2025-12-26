
export interface WSEKDDVisitEvent{
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
	/**	Title : Data	*/
	title: string
	/**	Kindergarten : Link - WSE KDD Kindergarten	*/
	kindergarten: string
	/**	Event Datetime : Datetime	*/
	event_datetime: string
	/**	Group Photo : Attach Image	*/
	group_photo?: string
	/**	Registration Link : Data	*/
	registration_link?: string
	/**	Registration open : Check	*/
	registration_open?: 0 | 1
}