import {Injectable} from '@nestjs/common';
import {CreateCartDto} from '../dto/create-cart.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Cart} from "../schemas/carts.schema";
import {Model} from "mongoose";
import {Product} from "../schemas/products.schema";

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {
  }

  async create(createCartDto: CreateCartDto) {
    return this.cartModel.create(createCartDto);
  }

  async find(query: {
    user?: string
  }) {
    return this.cartModel.find(query);
  }

  async findOne(id: string) {
    return this.cartModel.findById(id);
  }

  async findUserCart(userId: string) {
    const card = await this.cartModel.findOne({user: userId});
    if (!card) {
      return this.create({user: userId});
    }
    const products = await Promise.all(card.products.map(async p => {
      return {
        quantity: p.quantity,
        product: await this.productModel.findById(p.productId)
      };
    }));

    return {
      count: card.count,
      user: card.user,
      _id: card._id,
      products
    }
  }

  async addProduct(id: string, product: { id: string, quantity: number }) {
    const cart = await this.cartModel.findById(id);
    const productIndex = cart.products.findIndex(p => {
      return "" + p.productId === product.id
    });

    if (productIndex > -1) {
      // Product exists in the cart, increase quantity
      cart.products[productIndex].quantity += product.quantity;
    } else {
      // Product does not exist in the cart, add new product
      //console.log(product.quantity);
      cart.products.push({productId: product.id, quantity: product.quantity});
    }
    return cart.save();
  }

  async addProductByUser(userId: string, product: { id: string, quantity: number }) {
    const cart = await this.cartModel.findOne({user: userId});
    const productIndex = cart.products.findIndex(p => {
      return "" + p.productId === product.id
    });

    if (productIndex > -1) {
      // Product exists in the cart, increase quantity
      cart.products[productIndex].quantity += product.quantity;
    } else {
      // Product does not exist in the cart, add new product
      //console.log(product.quantity);
      cart.products.push({productId: product.id, quantity: product.quantity});
    }
    return cart.save();
  }

  async remove(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, product: { id: string }) {

    const cart = await this.cartModel.findById(id);
    const productIndex = cart.products.findIndex(p => {
      return "" + p.productId === product.id
    });

    if (productIndex > -1) {
      // Product exists in the cart, remove it
      cart.products.splice(productIndex, 1);
    }
    return cart.save();
  }
}
