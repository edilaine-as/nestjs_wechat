import { ChatParticipant } from 'src/modules/chat/infra/entities/chat-participant.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(
    () => ChatParticipant,
    (participant) => participant.user,
  )
  chatParticipants: ChatParticipant[]

  @CreateDateColumn()
  createdAt: Date
}
