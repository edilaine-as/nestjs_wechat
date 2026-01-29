import {
  Body,
  Controller,
  Post,
} from '@nestjs/common'
import { UserService } from './application/user.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data)
  }
}
