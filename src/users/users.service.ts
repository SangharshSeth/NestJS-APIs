import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(userData: User): Promise<User> {
    return await this.userModel.create(userData);
  }
  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }
}
