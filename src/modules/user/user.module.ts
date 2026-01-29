import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './infra/entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './application/user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
