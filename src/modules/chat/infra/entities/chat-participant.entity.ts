import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Chat } from './chat.entity'
import { User } from 'src/modules/user/infra/entities/user.entity'

@Entity('chat-participants')
@Unique(['chat', 'user'])
export class ChatParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(
    () => Chat,
    (chat) => chat.participants,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'chatId' })
  chat: Chat

  @ManyToOne(
    () => User,
    (user) => user.chatParticipants,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'userId' })
  user: User
}
