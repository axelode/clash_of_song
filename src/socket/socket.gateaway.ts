// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// // src/socket/socket.gateway.ts
// @WebSocketGateway({
//   cors: {
//     origin: '*', // Adjust CORS as needed
//   },
// })
// export class SocketGateway {
//   @WebSocketServer()
//   server: Server;

//   private rooms: Record<string, Set<string>> = {}; // Map roomId to set of userIds

//   @SubscribeMessage('findMatch')
//   async handleFindMatch(client: Socket): Promise<void> {
//     const availableRoom = Object.keys(this.rooms).find(
//       (roomId) => this.rooms[roomId].size < 2,
//     );

//     if (availableRoom) {
//       // Join the existing room
//       client.join(availableRoom);
//       this.rooms[availableRoom].add(client.id);
//       client.emit('matchFound', { roomId: availableRoom });
//     } else {
//       // Create a new room if none are available
//       const newRoomId = `room-${Date.now()}`;
//       client.join(newRoomId);
//       this.rooms[newRoomId] = new Set([client.id]);
//       client.emit('matchFound', { roomId: newRoomId });
//     }
//   }

//   @SubscribeMessage('joinRoom')
//   handleJoinRoom(client: Socket, payload: { roomId: string }): void {
//     const { roomId } = payload;
//     client.join(roomId);
//     if (!this.rooms[roomId]) {
//       this.rooms[roomId] = new Set();
//     }
//     this.rooms[roomId].add(client.id);

//     if (this.rooms[roomId].size > 5) {
//       client.emit('roomFull', { roomId });
//       client.leave(roomId);
//       this.rooms[roomId].delete(client.id);
//     }
//   }

//   @SubscribeMessage('leaveRoom')
//   handleLeaveRoom(client: Socket, payload: { roomId: string }): void {
//     const { roomId } = payload;
//     client.leave(roomId);
//     if (this.rooms[roomId]) {
//       this.rooms[roomId].delete(client.id);
//     }
//   }
// }
