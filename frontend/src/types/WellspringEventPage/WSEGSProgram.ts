export type WSEGSProgram = {
  name: string;
  program_code: string;
  title_en: string;
  title_vn: string;
  opened_datetime: string | null;
  expired_datetime: string | null;
  is_current: 0 | 1;
  is_opened: 0 | 1;
  is_expired: 0 | 1;
  creation: string;
  modified: string;
  owner: string;
  modified_by: string;
};
