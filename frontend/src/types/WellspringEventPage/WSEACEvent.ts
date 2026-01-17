
export interface WSEACEvent{
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
	/**	School Year : Data - e.g., 2025-2026	*/
	school_year?: string
	/**	Is Active : Check - Managed by WSE AC Settings	*/
	is_active?: 0 | 1
	/**	Expired Date : Datetime	*/
	expired_date?: string
	/**	Open Test Registration : Check	*/
	open_test_registration?: 0 | 1
	/**	Open NHTN Event : Check	*/
	open_nhtn_event?: 0 | 1
	/**	Test Registration Closing Time : Datetime	*/
	test_registration_closing_time?: string
	/**	Event Registration Closing Time : Datetime	*/
	event_registration_closing_time?: string
	/**	Test Result Attachment : Check	*/
	test_result_attachment?: 0 | 1
	/**	Main Background : Attach Image - Main/initial background image for check-in page	*/
	checkin_bg_main?: string
	/**	Active Background : Attach Image - Background during check-in state	*/
	checkin_bg_active?: string
	/**	Idle Background : Attach Image - Background after reset/idle state	*/
	checkin_bg_idle?: string
}