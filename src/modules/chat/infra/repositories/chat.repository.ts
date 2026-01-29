import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Chat } from '../entities/chat.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ChatRepository {
  constructor(
    @InjectRepository(Chat)
    private readonly repo: Repository<Chat>,
  ) {}

  createAndSave() {
    const chat = this.repo.create()

    return this.repo.save(chat)
  }

  async findById(chatId: string) {
    return this.repo.findOne({
      where: { id: chatId },
    })
  }

  async findAllByUser(userId: string) {
    return this.repo.find({
      relations: [
        'participants',
        'participants.user',
      ],
      where: {
        participants: {
          user: { id: userId },
        },
      },
    })
  }
}
