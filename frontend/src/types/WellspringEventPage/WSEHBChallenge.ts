
export interface WSEHBChallenge{
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
	/**	Thumbnail : Attach Image	*/
	thumbnail: string
	/**	Sequence Number : Int	*/
	sequence_number: number
	/**	Happy Box Event : Link - WSE Event	*/
	happy_box_event: string
	/**	Release Date : Date	*/
	release_date: string
	/**	Number Of Submissions : Int	*/
	number_of_submissions?: number
	/**	Description : Small Text	*/
	description?: string
}