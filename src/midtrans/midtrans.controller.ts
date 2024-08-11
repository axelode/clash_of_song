import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { MidtransService } from './midtrans.service';

import { NotificationDto } from './dto/notification.dto';
import { CreateTransactionDto } from './dto/midtrans.dto';

@Controller('midtrans')
export class MidtransController {
  constructor(private readonly midtransService: MidtransService) {}

  @Post('create')
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    if (!createTransactionDto.qty || createTransactionDto.qty <= 0) {
      throw new Error('Invalid qty value');
    }
    return this.midtransService.createTransaction(createTransactionDto);
  }

  // @Get('status/:orderId')
  // async getTransactionStatus(@Param('orderId') orderId: string) {
  //   return this.midtransService.getTransactionStatus(orderId);
  // }

  @Post('notification')
  async handleNotification(@Body() notificationDto: NotificationDto) {
    return this.midtransService.handleNotification(notificationDto);
  }
}
