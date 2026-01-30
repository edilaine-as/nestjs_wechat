import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './infra/entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './application/user.service'
import { UsersRepository } from './infra/repositories/user.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    UsersRepository,
  ],
  controllers: [UserController],
})
export class UserModule {}
