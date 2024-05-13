import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {SchemaTypes} from "mongoose";

@Schema({collection: 'carts'})
export class Cart {
  @Prop({
    type: [{productId: SchemaTypes.ObjectId, quantity: Number}],
    ref: 'Product',
  })
  products: { productId: string, quantity: number }[];
  @Prop({required: true, default: 0})
  count: number;
  @Prop({
    required: true,
    unique: true,
    type: SchemaTypes.ObjectId,
    ref: 'User'
  })
  user: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.post('save', async function (doc: Cart) {
  doc.count = doc.products.reduce((acc, curr) => acc + curr.quantity, 0);
})