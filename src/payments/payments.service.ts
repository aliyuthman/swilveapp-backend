import { Injectable } from '@nestjs/common';
import { Flutterwave } from 'flutterwave-node-v3';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { transactions } from '../database/schema';

@Injectable()
export class PaymentsService {
  private flw = new Flutterwave(
    process.env.FLUTTERWAVE_PUBLIC_KEY!,
    process.env.FLUTTERWAVE_SECRET_KEY!,
  );

  constructor(private readonly db: DatabaseService) {}

  async initiatePayment(
    userId: string, 
    amount: number, 
    customerId: string // Add customerId parameter
  ) {
    const reference = `BILLPAY-${uuidv4()}`;

    await this.db.db.insert(transactions).values({
      userId,
      amount: amount.toString(),
      status: 'pending',
      reference,
      customerId, // Include customerId in transaction
      billerId: 'biller-id', // Replace with actual biller ID
    });

    return this.flw.Transaction.charge({
      tx_ref: reference,
      amount,
      currency: 'NGN',
      customer: { email: 'user@example.com' },
    });
  }
}