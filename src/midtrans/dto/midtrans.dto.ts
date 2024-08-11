// src/midtrans/dto/create-transaction.dto.ts

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  qty: number;

  @IsInt()
  @IsNotEmpty()
  price: number;
}
