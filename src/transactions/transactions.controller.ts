import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('initiate')
  async initiatePayment(
    @Body() dto: { userId: string; billerId: string; amount: number; customerId: string },
  ) {
    return this.transactionsService.initiateTransaction(
      dto.userId,
      dto.billerId,
      dto.amount,
      dto.customerId,
    );
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    return this.transactionsService.getTransaction(id);
  }

  @Get('history/:userId')
  async getHistory(@Param('userId') userId: string) {
    return this.transactionsService.getUserTransactions(userId);
  }
}