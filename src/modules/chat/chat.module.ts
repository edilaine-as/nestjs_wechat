import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './application/chat.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chat } from './infra/entities/chat.entity'
import { Message } from './infra/entities/message.entity'
import { ChatParticipant } from './infra/entities/chat-participant.entity'
import { ChatController } from './chat.controller'
import { ChatRepository } from './infra/repositories/chat.repository'
import { ChatParticipantRepository } from './infra/repositories/chat-participant.repository'
import { MessageRepository } from './infra/repositories/message.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Chat,
      ChatParticipant,
      Message,
    ]),
  ],
  providers: [
    ChatGateway,
    ChatService,
    ChatRepository,
    ChatParticipantRepository,
    MessageRepository,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
