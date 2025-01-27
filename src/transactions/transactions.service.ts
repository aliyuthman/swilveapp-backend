import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { transactions } from '../database/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  constructor(private readonly db: DatabaseService) {}

  async initiateTransaction(
    userId: string,
    billerId: string,
    amount: number,
    customerId: string
  ) {
    const reference = `TX-${uuidv4()}`; // Generate unique reference
    
    const [transaction] = await this.db.db.insert(transactions).values({
      userId,
      billerId,
      amount: amount.toString(),
      status: 'pending',
      reference, // Add generated reference
      customerId,
    }).returning();
  
    return transaction;
  }
  async getTransaction(id: string) {
    return this.db.db.query.transactions.findFirst({
      where: eq(transactions.id, id),
    });
  }

  async getUserTransactions(userId: string) {
    return this.db.db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
    });
  }
}