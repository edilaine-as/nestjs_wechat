import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import {
  Socket,
  Server,
} from 'socket.io'
import { ChatService } from './application/chat.service'
import { JoinChatDto } from './dto/join-chat.dto'
import { SendMessageDto } from './dto/send-message.dto'

@WebSocketGateway(3002, {
  cors: { origin: '*' },
})
export class ChatGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect
{
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer() server: Server

  handleConnection(client: Socket) {
    console.log(
      '🟢 User connected:',
      client.id,
    )
  }

  handleDisconnect(client: Socket) {
    console.log(
      '🔴 User disconnected:',
      client.id,
    )
  }

  @SubscribeMessage('join-chat')
  handleJoinChat(
    client: Socket,
    data: JoinChatDto,
  ) {
    client.join(data.chatId)

    client
      .to(data.chatId)
      .emit('user-joined', {
        userId: data.userId,
      })
  }

  // Recebe mensagem do frontend
  @SubscribeMessage('send-message')
  async handleNewMessage(
    client: Socket,
    @MessageBody() data: SendMessageDto,
  ) {
    const message =
      await this.chatService.processMessage(
        data,
      )

    this.server
      .to(data.chatId)
      .emit('new-message', message)
  }

  //Sai do chat
  @SubscribeMessage('leave-chat')
  handleLeaveChat(
    client: Socket,
    data: JoinChatDto,
  ) {
    client.leave(data.chatId)

    client
      .to(data.chatId)
      .emit('user-left', {
        userId: data.userId,
      })
  }
}
