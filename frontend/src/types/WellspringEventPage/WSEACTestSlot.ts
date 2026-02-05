
export interface WSEACTestSlot{
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
	ac_event: string
	/**	Student Grade : Small Text - Comma-separated grades (e.g., G01,G02,G03)	*/
	student_grade: string
	/**	Title : Data	*/
	title?: string
	/**	Date : Date	*/
	date: string
	/**	Start Time : Time	*/
	start_time: string
	/**	End Time : Time	*/
	end_time: string
	/**	Max Capacity : Int	*/
	max_capacity: number
	/**	Current Registered : Int	*/
	current_registered?: number
	/**	Is Full : Check	*/
	is_full?: 0 | 1
	/**	Is Enabled : Check	*/
	is_enabled?: 0 | 1
}