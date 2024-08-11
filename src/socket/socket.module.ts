import { Module } from '@nestjs/common';
// import { SocketGateway } from './socket.gateaway';
import { SocketService } from './socket.service';

@Module({
  providers: [SocketService],
})
export class SocketModule {}
