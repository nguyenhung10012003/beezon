import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Product, ProductSchema } from "./products.schema";

enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

@Schema({collection: 'orders'})
export class Order {
  @Prop({
    required: true,
    type: [{product: ProductSchema, quantity: Number}]
  })
  products: { product: Product, quantity: number }[];
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  })
  seller: string;
  @Prop({required: true, default: 0})
  total: number;
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'User'
  })
  user: string;
  @Prop({required: true, default: OrderStatus.PENDING})
  status: OrderStatus;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre('save', function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});

OrderSchema.post('save', function (doc, next) {
  this.total = doc.products.reduce((acc, product) => acc + product.product.price * product.quantity, 0);
  next();
});