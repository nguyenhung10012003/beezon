import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from "./users.schema";
import {SchemaTypes} from "mongoose";

@Schema({collection: 'products'})
export class Product {


  @Prop({required: true})
  name: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true})
  detail: string;

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  quantity: number;

  @Prop({required: true})
  image: string;

  @Prop({
    type: [String],
    required: true,
  })
  categories: string[];

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  owner: User;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});

