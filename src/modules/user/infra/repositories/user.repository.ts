import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../../dto/create-user.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  createAndSave(
    data: CreateUserDto,
    hashedPassword: string,
  ) {
    const user = this.repo.create({
      ...data,
      password: hashedPassword,
    })

    return this.repo.save(user)
  }

  async findByUsername(
    username: string,
  ) {
    return await this.repo.findOne({
      where: { username },
    })
  }
}
