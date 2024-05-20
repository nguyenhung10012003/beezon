import {Module} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {OrdersController} from './orders.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Order, OrderSchema} from "../schemas/orders.schema";
import {ProductsModule} from "../products/products.module";
import {CartsModule} from "../carts/carts.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Order.name, schema: OrderSchema}
    ]),
    ProductsModule, CartsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {
}
