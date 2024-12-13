
export interface WSEHBSubmission{
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
	/**	Happy Box Challenge : Link - WSE HB Challenge	*/
	happy_box_challenge: string
	/**	Wellspring Code : Data	*/
	wellspring_code: string
	/**	Full Name : Data	*/
	full_name: string
	/**	User Type : Select	*/
	user_type: "Student" | "Staff"
	/**	Image : Attach Image	*/
	image?: string
	/**	Add To Gallery : Check	*/
	add_to_gallery?: 0 | 1
}