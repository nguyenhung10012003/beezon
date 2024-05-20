import {PartialType} from '@nestjs/mapped-types';
import {CreateUserDto} from './create-user.dto';
import {UserRole} from "../schemas/users.schema";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;
  password?: string;
  role?: UserRole;
  image?: string;
}
