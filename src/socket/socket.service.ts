import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from '../prisma/prisma.service';
import { request, response } from 'express';

interface Player {
  id: string;
  socket: Socket;
}

@Injectable()
@WebSocketGateway()
export class SocketService {
  @WebSocketServer()
  server: Server;

  private readonly connectedClients: Map<string, Socket> = new Map();
  private readonly waitingPlayers: Player[] = [];
  private readonly userRooms: Map<string, string> = new Map();

  constructor(private readonly prisma: PrismaService) { }

  @SubscribeMessage('startGame')
  handleStartGame(socket: Socket, data: { userId: string; }): void {
    const userId = data.userId;

    // Check if user is already in a room
    if (this.userRooms.has(userId)) {
      socket.emit('error', 'You are already in a game');
      return;
    }

    this.connectedClients.set(userId, socket);
    console.log(`Client connected: ${userId}`);

    // Send player data immediately after connecting
    const playerData = { id: userId, socketId: socket.id };
    socket.emit('connected', { player: playerData });

    socket.on('disconnect', () => {
      this.connectedClients.delete(userId);
      this.removePlayerFromQueue(userId);
      this.userRooms.delete(userId); // Remove user from rooms map on disconnect
      console.log(`Client disconnected: ${userId}`);
    });

    this.addPlayerToQueue({ id: userId, socket });
  }

  private addPlayerToQueue(player: Player): void {
    if (this.waitingPlayers.some((p) => p.id === player.id)) {
      console.log(`Player already in queue: ${player.id}`);
      return;
    }

    this.waitingPlayers.push(player);
    console.log('queue now', this.waitingPlayers);
    console.log(`Player added to queue: ${player.id}`);

    if (this.waitingPlayers.length >= 2) {
      this.createMatch();
    }
  }

  private removePlayerFromQueue(clientId: string): void {
    const index = this.waitingPlayers.findIndex(
      (player) => player.id === clientId,
    );
    if (index !== -1) {
      this.waitingPlayers.splice(index, 1);
      console.log(`Player removed from queue: ${clientId}`);
    }
  }

  private async createMatch(): Promise<void> {
    const players = this.waitingPlayers.splice(0, 2);

    const newMatch = await this.prisma.match.create({
      data: {
        status: 'pending',
        startTime: new Date().toISOString(),
        endTime: '',
      },
    });

    const roomId = `room-${newMatch.id}`;

    // Create a payload with the necessary player data
    const playerData = players.map((player) => ({
      id: player.id,
      socketId: player.socket.id,
    }));

    players.forEach((player) => {
      player.socket.join(roomId);
      player.socket.emit('matchFound', {
        roomId,
        matchId: newMatch.id,
        players: playerData,  // Send player data to the frontend
      });
      this.userRooms.set(player.id, roomId); // Add player to rooms map
    });

    console.log(
      `Match created with roomId: ${roomId} and players: ${players
        .map((p) => p.id)
        .join(', ')}`,
    );
  }
}
