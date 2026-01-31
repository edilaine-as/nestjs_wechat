import {
  ArrayNotEmpty,
  IsArray,
  IsUUID,
} from 'class-validator'

export class CreateChatDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  usersIds: string[]
}
