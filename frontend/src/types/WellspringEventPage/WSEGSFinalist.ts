
export interface WSEGSFinalist{
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
	/**	Display Order : Int	*/
	display_order?: number
	/**	Is Active : Check	*/
	is_active?: 0 | 1
	/**	Finalist Name (Tên tiết mục) : Data	*/
	finalist_name: string
	/**	Entry Category : Select	*/
	entry_category?: "Singing" | "Dancing" | "Instrumental" | "Other"
	/**	Entry Group : Select	*/
	entry_group?: "Group A" | "Group B" | "Group C"
	/**	Video URL (YouTube/Vimeo) : Data	*/
	video_url?: string
	/**	Thumbnail : Attach Image	*/
	thumbnail?: string
	/**	Vote Count : Int	*/
	vote_count?: number
}