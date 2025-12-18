/**
 * WSE GS Users DocType
 * Stores social login user data for Greatest Show 25 voting
 */
export type WSEGSUsers = {
  name: string; // Email (autoname field)
  email: string;
  full_name: string;
  facebook_user_id?: string;
  facebook_profile_picture?: string;
  first_login?: string;
  last_login?: string;
  total_votes: number;
  creation: string;
  modified: string;
  owner: string;
  modified_by: string;
};
