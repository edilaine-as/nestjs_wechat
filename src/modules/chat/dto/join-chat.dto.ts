import {
  IsDefined,
  IsUUID,
} from 'class-validator'

export class JoinChatDto {
  @IsUUID('4')
  @IsDefined()
  chatId: string

  @IsUUID('4')
  @IsDefined()
  userId: string
}
