
export interface WSEKDDKindergarten{
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
	/**	Logo : Attach Image	*/
	logo?: string
	/**	Kindergarten Code : Data	*/
	kindergarten_code: string
	/**	Contact Person : Data	*/
	contact_person?: string
	/**	Contact Email : Data	*/
	contact_email?: string
	/**	Contact Phone : Data	*/
	contact_phone?: string
}