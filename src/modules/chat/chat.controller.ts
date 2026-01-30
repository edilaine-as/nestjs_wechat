import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { ChatService } from './application/chat.service'

@Controller('chats')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @Post()
  async createChat(
    @Body('usersIds')
    usersIds: string[],
  ) {
    return this.chatService.createChatAndAddParticipants(
      usersIds,
    )
  }

  @Get('user/:userId')
  async getUserChats(
    @Param('userId') userId: string,
  ) {
    return this.chatService.getUserChats(
      userId,
    )
  }

  @Get(':chatId/messages')
  async getMessages(
    @Param('chatId') chatId: string,
    @Query('limit') limit = 20,
    @Query('cursor') cursor?: string,
  ) {
    return this.chatService.getMessages(
      chatId,
      Number(limit),
      cursor
        ? new Date(cursor)
        : undefined,
    )
  }
}
