import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get('/:userId')
  async findUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.findById(userId);
  }
}
