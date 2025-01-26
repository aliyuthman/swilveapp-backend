import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async initiatePayment(
    @Body('userId') userId: string,
    @Body('amount') amount: number,
  ) {
    return this.paymentsService.initiatePayment(userId, amount);
  }
}