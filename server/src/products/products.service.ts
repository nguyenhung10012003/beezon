import {Injectable} from '@nestjs/common';
import {Product} from "../schemas/products.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import ProductDto from "../dto/product.dto";
import {UpdateProductDto} from "../dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
  }

  async findAll() {
    return this.productModel.find();
  }

  async create(product: ProductDto) {

    return this.productModel.create(product);
  }

  async findOne(id: string) {
    return this.productModel.findById(id);
  }

  async update(id: string, product: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, product, {new: true});
  }

  async remove(id: string) {
    return this.productModel.deleteOne({_id: id});
  }

  async decreaseQuantity(id: string) {
    const product = await this.productModel.findById(id);
    if (product.quantity > 0) {
      product.quantity -= 1;
      return product.save();
    }
  }

  async searchProduct(query: {
    name?: string,
    category?: string,
    owner?: string,
    order?: 'asc' | 'desc',
    orderField?: string,
    limit?: number,
    offset?: number,
  }) {
    const queryBuilder = this.productModel.find();
    if (!query) {
      return queryBuilder.exec();
    }
    if (query.name) {
      queryBuilder.find({name: {$regex: query.name, $options: 'i'}});
    }
    if (query.category) {
      queryBuilder.find({categories: {$elemMatch: {$eq: query.category}}});
    }
    if (query.owner) {
      queryBuilder.find({owner: query.owner});
    }
    if (query.order && query.orderField) {
      queryBuilder.sort({[query.orderField]: query.order === 'asc' ? 1 : -1});
    }
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }
    if (query.offset) {
      queryBuilder.skip(query.offset);
    }
    return queryBuilder.exec();
  }

  async searchProductByName(name: string) {
    return this.productModel.find({name: {$regex: name, $options: 'i'}});
  }

  async searchProductByCategory(category: string) {
    return this.productModel.find({categories: {$elemMatch: {$eq: category}}});
  }

  async getAllUserProducts(userId: string) {
    return this.productModel.find({owner: userId});
  }
}
