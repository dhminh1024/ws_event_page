/**
 * Kindergarten data associated with a visit event
 */
export interface KindergartenData {
  name: string;
  title: string;
  logo?: string;
  kindergarten_code: string;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
}

/**
 * Registered student information
 */
export interface RegisteredStudent {
  name: string;
  student_full_name: string;
  student_dob: string;
  certificate_url?: string;
}

/**
 * Visit event details
 */
export interface EventVisit {
  name: string;
  title: string;
  event_datetime: string;
  kindergarten: string;
  kindergarten_data: KindergartenData | null;
  registration_open: boolean;
  registration_link?: string;
  group_photo?: string;
  registration_count: number;
  registered_students: RegisteredStudent[];
}

/**
 * API response for get_event_details
 */
export interface EventVisitResponse {
  success: boolean;
  data: EventVisit;
  message: string;
}

/**
 * Certificate registration submission data
 */
export interface CertificateRegistrationData {
  certificate_url: string;
  certificate_token: string;
  student_name: string;
  event_title: string;
  already_registered: boolean;
}

/**
 * API response for submit_registration
 */
export interface SubmitRegistrationResponse {
  success: boolean;
  data?: CertificateRegistrationData;
  message: string;
}

/**
 * Certificate data retrieved by token
 */
export interface CertificateData {
  certificate_token: string;
  student_name: string;
  student_dob: string;
  event_title: string;
  event_datetime: string;
  kindergarten_name: string;
  kindergarten_logo?: string;
  group_photo?: string;
  parent_name: string;
  parent_email: string;
  certificate_pdf_url?: string;
  registration_date: string;
}

/**
 * API response for get_certificate
 */
export interface GetCertificateResponse {
  success: boolean;
  data?: CertificateData;
  message: string;
}
