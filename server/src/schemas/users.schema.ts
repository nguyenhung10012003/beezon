import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
}

@Schema({collection: 'users'})
export class User {

  @Prop({required: false})
  name: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  role: UserRole;

  @Prop()
  image: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});