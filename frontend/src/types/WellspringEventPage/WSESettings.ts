
export interface WSESettings{
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
	/**	Default Homepage Event : Link - WSE Event	*/
	default_homepage_event?: string
	/**	Default Homepage URL : Data	*/
	default_homepage_url?: string
}