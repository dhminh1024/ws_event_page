
export interface WSEKDDCertificateRegistration{
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
	/**	Parent Full Name : Data	*/
	parent_full_name: string
	/**	Parent Email : Data	*/
	parent_email: string
	/**	Parent Phone Number : Data	*/
	parent_phone_number: string
	/**	Registration Datetime : Datetime	*/
	registration_datetime?: string
	/**	Rating : Rating	*/
	rating: any
}