export type WSEGSFinalist = {
  name: string;
  gs_program: string;
  registration: string | null;
  is_active: 0 | 1;
  display_order: number;
  finalist_name: string;
  performer_name: string;
  entry_category: "Singing" | "Dancing" | "Instrumental" | "Other";
  entry_group: "Group A" | "Group B" | "Group C";
  video_url: string | null;
  thumbnail: string | null;
  vote_count: number;
  creation: string;
  modified: string;
  owner: string;
  modified_by: string;
};
