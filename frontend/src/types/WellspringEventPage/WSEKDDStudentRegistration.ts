import { WSEKDDCertificateRegistration } from './WSEKDDCertificateRegistration'

export interface WSEKDDStudentRegistration{
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
	/**	Visit Event : Link - WSE KDD Visit Event	*/
	visit_event: string
	/**	Kindergarten : Link - WSE KDD Kindergarten	*/
	kindergarten?: string
	/**	Student Full Name : Data	*/
	student_full_name: string
	/**	Student DOB : Date	*/
	student_dob: string
	/**	Certificate URL : Small Text	*/
	certificate_url?: string
	/**	Certificate Token : Data	*/
	certificate_token?: string
	/**	Certificate Registration Submission : Table - WSE KDD Certificate Registration	*/
	certificate_registration_submission?: WSEKDDCertificateRegistration[]
}