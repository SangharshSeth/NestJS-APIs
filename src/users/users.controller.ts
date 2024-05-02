import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { CreateUserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Get('/:userId')
  async findUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.findById(userId);
  }
}
