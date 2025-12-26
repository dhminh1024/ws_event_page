
export interface WSEGSProgram{
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
	/**	Program Code : Data	*/
	program_code: string
	/**	Title VN : Data	*/
	title_vn: string
	/**	Title EN : Data	*/
	title_en: string
	/**	Is current : Check	*/
	is_current?: 0 | 1
	/**	Is opened : Check	*/
	is_opened?: 0 | 1
	/**	Is expired : Check	*/
	is_expired?: 0 | 1
	/**	Opened Datetime : Datetime	*/
	opened_datetime?: string
	/**	Expired Datetime : Datetime	*/
	expired_datetime?: string
}