
export interface WSENJSubmissionImage{
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
	/**	Question : Link - WSE NJ Question	*/
	question: string
	/**	Sequence Number : Data - Format {question_order}.{image_order}, e.g. Q1.1, Q2.3	*/
	sequence_number: string
	/**	Image Url : Data	*/
	image_url: string
}