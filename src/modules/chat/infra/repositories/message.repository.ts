import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Message } from '../entities/message.entity'
import { SendMessageDto } from '../../dto/send-message.dto'

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(Message)
    private readonly repo: Repository<Message>,
  ) {}

  createAndSave(data: SendMessageDto) {
    const message = this.repo.create({
      content: data.content,
      sender: { id: data.userId },
      chat: { id: data.chatId },
    })

    return this.repo.save(message)
  }

  findMessages(
    chatId: string,
    limit: number,
    cursor?: Date,
  ) {
    const qb = this.repo
      .createQueryBuilder('message')
      .where(
        'message.chatId = :chatId',
        { chatId },
      )

    if (cursor) {
      qb.andWhere(
        'message.createdAt < :cursor',
        { cursor },
      )
    }

    return qb
      .orderBy(
        'message.createdAt',
        'DESC',
      )
      .take(limit)
      .getMany()
  }
}
