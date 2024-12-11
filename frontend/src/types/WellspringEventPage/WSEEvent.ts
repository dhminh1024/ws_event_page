
export interface WSEEvent{
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
	/**	URL : Data	*/
	url: string
	/**	Description : Small Text	*/
	description?: string
}