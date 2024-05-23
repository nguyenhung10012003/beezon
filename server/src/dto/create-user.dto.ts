import { UserRole } from "../schemas/users.schema";

export class CreateUserDto {
  name?: string;
  email: string;
  password: string;
  role?: UserRole;
}
