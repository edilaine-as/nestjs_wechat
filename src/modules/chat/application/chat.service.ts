import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ChatRepository } from '../infra/repositories/chat.repository'
import { ChatParticipantRepository } from '../infra/repositories/chat-participant.repository'
import { MessageRepository } from '../infra/repositories/message.repository'
import { SendMessageDto } from '../dto/send-message.dto'
import { Message } from '../infra/entities/message.entity'

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly participantRepository: ChatParticipantRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  async processMessage(
    data: SendMessageDto,
  ): Promise<Message> {
    const chat =
      await this.chatRepository.findById(
        data.chatId,
      )

    if (!chat) {
      throw new NotFoundException(
        'Chat not found',
      )
    }

    const isParticipant =
      await this.participantRepository.userIsParticipant(
        data.chatId,
        data.userId,
      )

    if (!isParticipant) {
      throw new ForbiddenException(
        'User is not a participant of this chat',
      )
    }

    const message =
      await this.messageRepository.createAndSave(
        {
          chatId: data.chatId,
          senderId: data.userId,
          content: data.content,
        },
      )

    return message
  }

  async createChatAndAddParticipants(
    userIds: string[],
  ) {
    const chat =
      await this.chatRepository.createAndSave()

    await Promise.all(
      userIds.map((userId) =>
        this.participantRepository.createAndSave(
          chat.id,
          userId,
        ),
      ),
    )

    return chat
  }

  getUserChats(userId: string) {
    return this.chatRepository.findAllByUser(
      userId,
    )
  }

  getMessages(
    chatId: string,
    limit: number,
    cursor?: Date,
  ) {
    return this.messageRepository.findMessages(
      chatId,
      limit,
      cursor,
    )
  }
}
