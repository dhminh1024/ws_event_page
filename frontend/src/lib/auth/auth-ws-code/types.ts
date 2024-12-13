export interface AuthWSCodeResponse {
  userType: "Student" | "Staff";
  userData: {
    fullName: string;
    email: string;
    gender: string;
    wellspringCode: string;
    currentClass?: string;
  };
}
