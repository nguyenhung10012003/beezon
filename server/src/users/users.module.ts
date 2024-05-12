import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/users.schema";
import {ProductsModule} from "../products/products.module";
import {AuthService} from "../auth/auth.service";
import {AuthController} from "../auth/auth.controller";
import {CartsModule} from "../carts/carts.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ]),
    ProductsModule, CartsModule
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
}
