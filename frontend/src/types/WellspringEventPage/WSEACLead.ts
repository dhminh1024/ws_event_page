
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
	/**	Registration Number : Data	*/
	registration_number: string
	/**	Contact Email : Data	*/
	contact_email: string
	/**	Student Full Name : Data	*/
	student_full_name: string
	/**	Parent Full Name : Data	*/
	parent_full_name?: string
	/**	Registration Timestamp : Datetime	*/
	registration_timestamp?: string
	/**	Mobile Number : Data	*/
	mobile_number?: string
	/**	Student Grade : Select	*/
	student_grade?: "K1" | "K2" | "K3" | "K4" | "K5" | "K6" | "K7" | "K8" | "K9" | "K10" | "K11" | "K12"
	/**	QR Code : Attach Image	*/
	qr_code?: string
	/**	Status : Select	*/
	status: "New" | "Confirmation Email Sent" | "Checked in"
	/**	Group Name : Data	*/
	group_name: string
	/**	Booking ID : Data	*/
	booking_id?: string
	/**	Progress Status : Select	*/
	progress_status: "Waiting For Invitation" | "Invitation Email Sent" | "Registered For Test" | "Checked In Test"
	/**	Registered Slot : Link - WSE AC Test Slot	*/
	registered_slot?: string
	/**	Test Score : Float	*/
	test_score?: number
	/**	Invitation Sent At : Datetime	*/
	invitation_sent_at?: string
	/**	Test Registered At : Datetime	*/
	test_registered_at?: string
	/**	Test Checked In At : Datetime	*/
	test_checked_in_at?: string
}