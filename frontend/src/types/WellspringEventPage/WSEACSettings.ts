
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
	/**	Current Event : Link - WSE AC Event - The currently active admission check-in event	*/
	current_event?: string
	/**	Confirmation Email Template : Link - Email Template - Email template for NHTN event confirmation	*/
	confirmation_email_template?: string
	/**	Test Invitation (After Event) Template : Link - Email Template - Email template for test invitation (leads who checked in at event)	*/
	test_invitation_after_event_template?: string
	/**	Test Invitation (General) Template : Link - Email Template - Email template for test invitation (general leads)	*/
	test_invitation_general_template?: string
	/**	Test Registration Confirmation Template : Link - Email Template - Email template for test slot registration confirmation	*/
	test_registration_confirmation_template?: string
	/**	Result DS1 (Pass) Template : Link - Email Template - Email template for DS1 pass result	*/
	result_ds1_template?: string
	/**	Result DS2 (Pass) Template : Link - Email Template - Email template for DS2 pass result	*/
	result_ds2_template?: string
	/**	Result DS3 (Pass) Template : Link - Email Template - Email template for DS3 pass result	*/
	result_ds3_template?: string
	/**	Result DS4 (Fail) Template : Link - Email Template - Email template for DS4 fail result	*/
	result_ds4_template?: string
	/**	Bank Account Number : Data	*/
	bank_account_number?: string
	/**	Bank Account Name : Data	*/
	bank_account_name?: string
	/**	Bank BIN Number : Data	*/
	bank_bin_number?: string
	/**	Bank Name : Data	*/
	bank_name?: string
	/**	Bank Short Name : Data	*/
	bank_short_name?: string
	/**	Payment Amount : Currency	*/
	payment_amount?: number
	/**	Payment Info Template : Data - Template for payment info. Use {student_name} and {registration_number} as placeholders.	*/
	payment_info_template?: string
}