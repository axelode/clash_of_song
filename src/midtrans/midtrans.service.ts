import { Injectable } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';
import { PrismaClient } from '@prisma/client';

import { NotificationDto } from './dto/notification.dto';
import { CreateTransactionDto } from './dto/midtrans.dto';

@Injectable()
export class MidtransService {
  private snap: midtransClient.Snap;

  constructor(private prisma: PrismaClient) {
    this.snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      const orderId = `order-${new Date().getTime()}`;
      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: createTransactionDto.qty * createTransactionDto.price,
        },
        customer_details: {
          name: createTransactionDto.name,
        },
        item_details: [
          {
            id: 'item01',
            price: createTransactionDto.price,
            quantity: createTransactionDto.qty,
            name: 'Item Name',
          },
        ],
      };

      const transaction = await this.snap.createTransaction(parameter);

      await this.prisma.invoice.create({
        data: {
          id: orderId,
          status: 'pending',
          amount: parameter.transaction_details.gross_amount.toString(),
          qty: createTransactionDto.qty,
          userId: createTransactionDto.userId,
          createdAt: new Date(),
          updateAt: new Date(),
        },
      });

      return transaction;
    } catch (error) {
      throw new Error(`Midtrans error: ${error.message}`);
    }
  }
  async handleNotification(notification: NotificationDto) {
    const { transaction_status, order_id } = notification;

    try {
      await this.prisma.invoice.update({
        where: { id: order_id },
        data: { status: transaction_status },
      });
      console.log(transaction_status);

      if (
        transaction_status === 'capture' ||
        transaction_status === 'settlement'
      ) {
        const invoice = await this.prisma.invoice.findUnique({
          where: { id: order_id },
          select: { userId: true, qty: true, amount: true },
        });
        console.log(invoice);

        if (invoice) {
          const qty = invoice.qty;
          await this.prisma.diamond.upsert({
            where: {
              userId: invoice.userId,
            },
            update: {
              qty: {
                increment: qty,
              },
            },
            create: {
              qty: qty,
              price: invoice.amount,
              userId: invoice.userId,
            },
          });
          const totalDiamonds = await this.prisma.diamond.aggregate({
            _sum: {
              qty: true,
            },
            where: {
              userId: invoice.userId,
            },
          });

          await this.prisma.user.update({
            where: {
              id: invoice.userId,
            },
            data: {
              diamondQty: totalDiamonds._sum.qty,
            },
          });
        }
      }

      return { orderId: order_id, transactionStatus: transaction_status };
    } catch (error) {
      throw new Error(`Error updating invoice status: ${error.message}`);
    }
  }
}
