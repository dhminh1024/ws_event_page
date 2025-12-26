
export interface WSEGSUsers{
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
	/**	Email : Data	*/
	email: string
	/**	Full Name : Data	*/
	full_name?: string
	/**	Facebook User ID : Data	*/
	facebook_user_id?: string
	/**	Profile Picture URL : Data	*/
	facebook_profile_picture?: string
	/**	First Login : Datetime	*/
	first_login?: string
	/**	Last Login : Datetime	*/
	last_login?: string
	/**	Total Votes : Int	*/
	total_votes?: number
	/**	Access Token : Password	*/
	access_token?: string
}