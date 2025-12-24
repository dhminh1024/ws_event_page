
export interface WSEACEvent {
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
	/**	School Year : Data	*/
	school_year?: string
	/**	Is Active : Check	*/
	is_active?: 0 | 1
	/**	Expired Date : Datetime	*/
	expired_date?: string
	/**	Open Test Registration : Check	*/
	open_test_registration?: 0 | 1
	/**	Open NHTN Event : Check	*/
	open_nhtn_event?: 0 | 1
	/**	Test Registration Closing Time : Datetime	*/
	test_registration_closing_time?: string
	/**	Test Result Attachment : Check	*/
	test_result_attachment?: 0 | 1
	/**	Computed: Is Registration Closed	*/
	is_registration_closed?: boolean
}
