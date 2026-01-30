import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../infra/repositories/user.repository'
import { CreateUserDto } from '../dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
  ) {}

  async create(data: CreateUserDto) {
    const hashedPassword =
      await bcrypt.hash(
        data.password,
        6,
      )

    return this.userRepository.createAndSave(
      data,
      hashedPassword,
    )
  }
}
