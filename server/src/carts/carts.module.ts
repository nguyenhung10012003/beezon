import {Module} from '@nestjs/common';
import {CartsService} from './carts.service';
import {CartsController} from './carts.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Cart, CartSchema} from "../schemas/carts.schema";
import {ProductsModule} from "../products/products.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Cart.name, schema: CartSchema}
    ]),
    ProductsModule
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService]
})
export class CartsModule {
}
