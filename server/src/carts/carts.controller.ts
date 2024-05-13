import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {CartsService} from './carts.service';
import {CreateCartDto} from '../dto/create-cart.dto';

@Controller('cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {
  }

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  find(@Query() query: {
    user?: string
  }) {
    return this.cartsService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Get('user/:userId')
  findUserCart(@Param('userId') userId: string) {
    return this.cartsService.findUserCart(userId);
  }

  @Patch(':id/add')
  addProduct(@Param('id') id: string, @Body() product: { id: string, quantity: number }) {
    return this.cartsService.addProduct(id, product);
  }

  @Patch('user/:userId/add')
  addProductToUserCart(@Param('userId') userId: string, @Body() product: { id: string, quantity: number }) {
    return this.cartsService.addProductByUser(userId, product);
  }

  @Patch(':id/remove')
  removeProduct(@Param('id') id: string, @Body() product: { id: string }) {
    return this.cartsService.removeProduct(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
