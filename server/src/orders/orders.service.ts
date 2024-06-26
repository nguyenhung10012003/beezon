import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Cart } from '../schemas/carts.schema';
import { Order } from '../schemas/orders.schema';
import { Product } from '../schemas/products.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    //console.log(createOrderDto);
    const products = await Promise.all(
      createOrderDto.products.map(async (product) => {
        const productDoc = await this.productModel.findById(product.product);
        return { product: productDoc, quantity: product.quantity };
      }),
    );
    try {
      const order = await this.orderModel.create({
        products,
        user: createOrderDto.user,
        seller: createOrderDto.seller,
        total: products.reduce((acc, product) => {
          return acc + product.product.price * product.quantity;
        }, 0),
      });
      console.log(order);
      return order;
    } catch (e) {
      console.log(e);
    }
  }

  async createByCart(userId: string) {
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found');
    }
    const products = await Promise.all(
      cart.products.map(async (product) => {
        const productDoc = await this.productModel.findById(product.productId);
        return { product: productDoc, quantity: product.quantity };
      }),
    );
    try {
      const orders = await Promise.all(
        products.map(async (product) => {
          return await this.orderModel.create({
            products: [product],
            user: userId,
            seller: product.product.owner,
          });
        }),
      );
      await this.cartModel.findOneAndUpdate({ user: userId }, { products: [] });
      return orders;
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
    const queryBuilder = this.orderModel.aggregate([
      {
        $match: query?.seller
          ? { seller: new Types.ObjectId(query.seller) }
          : {},
      },
      {
        $lookup: {
          from: 'users',
          localField: 'seller',
          foreignField: '_id',
          as: 'seller',
        },
      },
      {
        $unwind: '$seller',
      },
      {
        $project: {
          _id: 1,
          products: 1,
          user: 1,
          status: 1,
          total: 1,
          createdAt: 1,
          seller: {
            _id: 1,
            name: 1,
          },
        },
      },
    ]);

    if (query?.user) {
      queryBuilder.match({ user: new Types.ObjectId(query.user) });
    }
    // if (query?.seller) {
    //   queryBuilder.match({seller: {_id: query.seller}});
    // }
    if (query?.status) {
      queryBuilder.match({ status: query.status });
    }

    if (query?.orderField && query?.order) {
      queryBuilder.sort({ [query.orderField]: query.order });
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
