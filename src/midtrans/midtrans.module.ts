import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { MidtransController } from './midtrans.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [MidtransController],
  providers: [
    MidtransService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
})
export class MidtransModule {}
