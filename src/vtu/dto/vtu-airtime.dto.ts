// src/vtu/dto/vtu-airtime.dto.ts
import { IsPhoneNumber, IsIn, IsPositive } from 'class-validator';

export class VtuAirtimeDto {
  @IsPhoneNumber('NG')
  phone: string;

  @IsPositive()
  amount: number;

  @IsIn(['MTN', 'GLO', 'AIRTEL', '9MOBILE'])
  network: string;
}