import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from '../dto/create-order.dto';
import {UpdateOrderDto} from '../dto/update-order.dto';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() query: {
    user?: string;
    status?: string;
    order?: 'asc' | 'desc';
    orderField?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.ordersService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
