import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../infra/entities/user.entity'
import { UsersRepository } from '../infra/repositories/user.repository'
import { CreateUserDto } from '../dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
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
