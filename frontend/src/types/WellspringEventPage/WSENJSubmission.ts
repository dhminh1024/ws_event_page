import { WSENJSubmissionImage } from './WSENJSubmissionImage'

export interface WSENJSubmission{
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
	/**	Wellspring Code : Data	*/
	wellspring_code: string
	/**	Current Class : Data	*/
	current_class?: string
	/**	Student Person : Link - SIS Person	*/
	student_person?: string
	/**	Student : Link - SIS Student	*/
	student: string
	/**	Full Name : Data	*/
	full_name?: string
	/**	Images : Table - WSE NJ Submission Image	*/
	images?: WSENJSubmissionImage[]
}