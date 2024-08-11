import { IsString, IsOptional } from 'class-validator';

export class NotificationDto {
  @IsString()
  @IsOptional()
  order_id?: string;

  @IsString()
  @IsOptional()
  transaction_status?: string;
}
