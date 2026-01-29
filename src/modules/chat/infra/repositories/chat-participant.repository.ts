import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ChatParticipant } from '../entities/chat-participant.entity'

@Injectable()
export class ChatParticipantRepository {
  constructor(
    @InjectRepository(ChatParticipant)
    private readonly repo: Repository<ChatParticipant>,
  ) {}

  createAndSave(
    chatId: string,
    userId: string,
  ) {
    const chatParticipant =
      this.repo.create({
        chat: { id: chatId },
        user: { id: userId },
      })

    return this.repo.save(
      chatParticipant,
    )
  }

  async userIsParticipant(
    chatId: string,
    userId: string,
  ) {
    const participant =
      await this.repo.findOne({
        where: {
          chat: { id: chatId },
          user: { id: userId },
        },
      })

    return !!participant
  }
}
