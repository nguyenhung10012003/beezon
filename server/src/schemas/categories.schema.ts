import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

enum Meta {
  MECHANICAL = 'mechanical',
  ELECTRICAL = 'electrical',
  BUILDING = 'building',
}

@Schema({collection: 'categories'})
export class Category {
  @Prop({required: true, unique: true})
  name: string;
  @Prop({required: true})
  description: string;
  @Prop()
  meta: Meta;
}

export const CategorySchema = SchemaFactory.createForClass(Category);