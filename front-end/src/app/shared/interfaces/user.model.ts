import { UserRole } from "./user-role.model";

export interface User {
  _id: string,
  googleId?: string;
  facebookId?: string;
  displayName: string;
  email: string;
  picture?: string;
  name?: string;
  surname?: string;
  role: UserRole;
}
