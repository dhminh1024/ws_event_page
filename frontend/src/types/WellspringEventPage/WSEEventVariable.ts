
export interface WSEEventVariable{
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
	/**	Variable Name : Data	*/
	variable_name: string
	/**	Variable Type : Select	*/
	variable_type?: "Text" | "Image"
	/**	Variable Value : Data	*/
	variable_value?: string
	/**	Image : Attach Image	*/
	image?: string
}