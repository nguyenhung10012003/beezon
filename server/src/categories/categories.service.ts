import {Injectable} from '@nestjs/common';
import {CreateCategoryDto} from '../dto/create-category.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Category} from "../schemas/categories.schema";
import {Model} from "mongoose";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  async find(query?: {
    name?: string,
    meta?: string,
    order?: 'asc' | 'desc',
    limit?: number,
    offset?: number,
  }) {
    const queryBuilder = this.categoryModel.find();
    if (!query) {
      return queryBuilder.exec();
    }
    if (query.name) {
      queryBuilder.find({name: query.name});
    }
    if (query.meta) {
      queryBuilder.find({meta: query.meta});
    }
    if (query.order) {
      queryBuilder.sort({name: query.order});
    }
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }
    if (query.offset) {
      queryBuilder.skip(query.offset);
    }
    return queryBuilder.exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id);
  }


  async remove(id: string) {
    return this.categoryModel.deleteOne({_id: id});
  }
}
