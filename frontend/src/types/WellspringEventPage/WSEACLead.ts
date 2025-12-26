
export interface WSEACLead{
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
	/**	AC Event : Link - WSE AC Event	*/
	ac_event?: string
	/**	Registration Number : Data	*/
	registration_number: string
	/**	Contact Email : Data	*/
	contact_email: string
	/**	Student Full Name : Data	*/
	student_full_name: string
	/**	Parent Full Name : Data	*/
	parent_full_name?: string
	/**	Student Gender : Select	*/
	student_gender: "Male" | "Female"
	/**	Registration Timestamp : Datetime	*/
	registration_timestamp?: string
	/**	Mobile Number : Data	*/
	mobile_number?: string
	/**	Student Grade : Select	*/
	student_grade?: "G01" | "G02" | "G03" | "G04" | "G05" | "G06" | "G07" | "G08" | "G09" | "G10" | "G11" | "G12"
	/**	QR Code : Attach Image	*/
	qr_code?: string
	/**	Status : Select	*/
	status: "New" | "Confirmation Email Sent" | "Checked in"
	/**	Group Name : Data	*/
	group_name?: string
	/**	Booking ID : Data	*/
	booking_id?: string
	/**	Progress Status : Select	*/
	progress_status: "Waiting For Invitation" | "Invitation Email Sent" | "Registered For Test" | "Checked In Test"
	/**	Registered Slot : Link - WSE AC Test Slot	*/
	registered_slot?: string
	/**	Test Slot Date : Date	*/
	test_slot_date?: string
	/**	Test Slot Start Time : Time	*/
	test_slot_start_time?: string
	/**	Test Slot End Time : Time	*/
	test_slot_end_time?: string
	/**	Invitation Sent At : Datetime	*/
	invitation_sent_at?: string
	/**	Test Registered At : Datetime	*/
	test_registered_at?: string
	/**	Test Checked In At : Datetime	*/
	test_checked_in_at?: string
	/**	Result Type : Select	*/
	result_type: "DS1" | "DS2" | "DS3" | "DS4"
	/**	Result Folder Link : Data	*/
	result_folder_link?: string
	/**	Result Report : Attach	*/
	result_report?: string
	/**	Congratulation Letter : Attach	*/
	congratz_letter?: string
}