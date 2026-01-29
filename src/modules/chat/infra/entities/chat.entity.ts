import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ChatParticipant } from './chat-participant.entity'

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(
    () => ChatParticipant,
    (participant) => participant.chat,
  )
  participants: ChatParticipant[]

  @CreateDateColumn()
  createdAt: Date
}
