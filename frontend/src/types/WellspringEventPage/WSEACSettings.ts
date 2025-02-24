
export interface WSEACSettings{
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
	/**	Open Test Registration : Check	*/
	open_test_registration?: 0 | 1
	/**	Open NHTN Event : Check	*/
	open_nhtn_event?: 0 | 1
	/**	Test Registration Closing Time : Datetime	*/
	test_registration_closing_time?: string
}