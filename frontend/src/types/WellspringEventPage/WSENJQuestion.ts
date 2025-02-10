
export interface WSENJQuestion{
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
	/**	Event : Link - WSE Event	*/
	event: string
	/**	Sequence Number : Data - e.g. Q1, Q2	*/
	sequence_number: string
	/**	Title VN : Data	*/
	title_vn: string
	/**	Description VN : Small Text	*/
	description_vn?: string
	/**	Title EN : Data	*/
	title_en: string
	/**	Description EN : Small Text	*/
	description_en?: string
}