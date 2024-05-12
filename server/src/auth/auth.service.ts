import {Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/users.schema";
import {Model} from "mongoose";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,) {
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(newPassword: string, passwordHash: string) {
    return await bcrypt.compare(newPassword, passwordHash);
  }

  async validateUser(username: string, pass: string) {
    const user = await this.userModel.findOne({email: username});
    if (!user) {
      throw new Error('User not found');
    } else {
      const isPasswordMatching = await this.comparePasswords(pass, user.password);
      if (!isPasswordMatching) {
        throw new Error('Wrong password');
      }
      return user;
    }
  }
}