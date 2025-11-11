import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type NewUser } from 'src/drizzle/schema';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() newUser: NewUser) {
    return this.usersService.create(newUser);
  }
}
