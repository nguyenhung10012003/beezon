import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { CartsService } from '../carts/carts.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Product } from '../schemas/products.schema';
import { User } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly authService: AuthService,
    private readonly cartsService: CartsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password,
    );
    const user = await this.userModel.create(createUserDto);
    await this.cartsService.create({ user: '' + user._id });
    return user;
  }

  async find(query?: {
    name?: string;
    role?: string;
    order?: 'asc' | 'desc';
    orderField?: string;
    limit?: number;
    offset?: number;
  }) {
    const queryBuilder = this.userModel.find();
    if (!query) {
      return queryBuilder.exec();
    }
    if (query.name) {
      queryBuilder.find({ name: { $regex: query.name, $options: 'i' } });
    }
    if (query.role) {
      queryBuilder.find({ type: query.role });
    }
    if (query.order && query.orderField) {
      queryBuilder.sort({ [query.orderField]: query.order === 'asc' ? 1 : -1 });
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
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.authService.hashPassword(
        updateUserDto.password,
      );
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
