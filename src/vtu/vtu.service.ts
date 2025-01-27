// src/vtu/vtu.service.ts
import { Injectable } from '@nestjs/common';
import { FlutterwaveService } from '../flutterwave/flutterwave.service';
import { DatabaseService } from '../database/database.service';
import { transactions } from '../database/schema';
import { eq } from 'drizzle-orm';
import { VtuAirtimeDto } from './dto/vtu-airtime.dto';

@Injectable()
export class VtuService {
  constructor(
    private flw: FlutterwaveService,
    private db: DatabaseService
  ) {}

  async purchaseAirtime(dto: VtuAirtimeDto) {
    const ref = `VTU-${Date.now()}`;
    
    const response = await this.flw.MobileTopup.send_airtime({
      country: 'NG',
      customer: dto.phone,
      amount: dto.amount,
      type: dto.network,
      reference: ref
    });

    await this.db.db.insert(transactions).values({
      type: 'airtime',
      network: dto.network,
      phone: dto.phone,
      amount: dto.amount.toString(),
      reference: ref,
      status: response.status === 'success' ? 'success' : 'pending'
    });

    return response;
  }
}