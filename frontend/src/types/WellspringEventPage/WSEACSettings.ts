
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
	/**	Current Event : Link - WSE AC Event	*/
	current_event?: string
	/**	Open Test Registration : Check (deprecated - use Event settings)	*/
	open_test_registration?: 0 | 1
	/**	Open NHTN Event : Check (deprecated - use Event settings)	*/
	open_nhtn_event?: 0 | 1
	/**	Test Registration Closing Time : Datetime (deprecated - use Event settings)	*/
	test_registration_closing_time?: string
	/**	Test Result Attachment : Check (deprecated - use Event settings)	*/
	test_result_attachment?: 0 | 1
	/**	Computed: Is Registration Closed	*/
	is_registration_closed?: boolean
}