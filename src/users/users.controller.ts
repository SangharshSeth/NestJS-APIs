import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('create')
    async createUser(@Body() user): Promise<User> {
        return this.userService.create(user)
    }
}
