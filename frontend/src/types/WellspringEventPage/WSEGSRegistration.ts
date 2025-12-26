
export interface WSEGSRegistration{
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
	/**	GS Program : Link - WSE GS Program	*/
	gs_program: string
	/**	Status : Select	*/
	status?: "Cancelled" | "Approved" | "Waiting for Approval"
	/**	Full Name : Data	*/
	full_name: string
	/**	Email : Data	*/
	email: string
	/**	Mobile Number : Data	*/
	mobile_number: string
	/**	Entry group : Select	*/
	entry_group: "Group A" | "Group B" | "Group C"
	/**	Entry name : Data	*/
	entry_name: string
	/**	Entry category : Select	*/
	entry_category: "Singing" | "Dancing" | "Instrumental" | "Other"
	/**	Talent info : Data	*/
	talent_info?: string
	/**	Instrumental info : Data	*/
	instrumental_info?: string
	/**	Entry participants : Small Text	*/
	entry_participants?: string
	/**	Attach file : Attach	*/
	attach_file?: string
}