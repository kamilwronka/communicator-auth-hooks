import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() createUserData: CreateUserDto) {
    return this.usersService.create(createUserData);
  }
}
