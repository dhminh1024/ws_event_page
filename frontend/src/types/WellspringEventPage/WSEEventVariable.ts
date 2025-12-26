
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
	variable_type?: "Text" | "Image" | "Video" | "PDF"
	/**	Image : Attach Image	*/
	image?: string
	/**	Variable Value : Text	*/
	variable_value?: string
	/**	Video : Attach	*/
	video?: string
	/**	PDF : Attach	*/
	pdf?: string
}