import {Injectable} from '@nestjs/common';
import {CreateOrderDto} from '../dto/create-order.dto';
import {UpdateOrderDto} from '../dto/update-order.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Order} from "../schemas/orders.schema";
import {Product} from "../schemas/products.schema";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel('Product') private productModel: Model<Product>,
  ) {
  }

  async create(createOrderDto: CreateOrderDto) {
    //console.log(createOrderDto);
    const products = await Promise.all(createOrderDto.products.map(async product => {
      const productDoc = await this.productModel.findById(product.product);
      return {product: productDoc, quantity: product.quantity};
    }));
    try {
      const order = await this.orderModel.create({products, user: createOrderDto.user, seller: createOrderDto.seller});
      console.log(order);
      return order;
    } catch (e) {
      console.log(e);
    }
  }

  async find(query?: {
    user?: string;
    seller?: string;
    status?: string;
    order?: 'asc' | 'desc';
    orderField?: string;
    limit?: number;
    offset?: number;
  }) {
    const queryBuilder = this.orderModel.find();
    if (query?.user) {
      queryBuilder.where('user', query.user);
    }
    if (query?.seller) {
      queryBuilder.where('seller', query.seller);
    }
    if (query?.status) {
      queryBuilder.where('status', query.status);
    }
    if (query?.orderField && query?.order) {
      queryBuilder.sort({[query.orderField]: query.order});
    }
    if (query?.limit) {
      queryBuilder.limit(query.limit);
    }
    if (query?.offset) {
      queryBuilder.skip(query.offset);
    }
    return queryBuilder.exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
