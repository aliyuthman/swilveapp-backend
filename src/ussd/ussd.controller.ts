// src/ussd/ussd.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { VtuService } from '../vtu/vtu.service';

@Controller('ussd')
export class UssdController {
  constructor(private vtuService: VtuService) {}

  @Post()
  async handleUssd(@Body() body: {
    phoneNumber: string;
    text: string;
    sessionId: string;
  }) {
    const [step, amount, network] = body.text.split('*');
    
    if (step === '1') {
      return `CON Enter Amount and Network:
Example: 500*MTN`;
    }
    
    if (amount && network) {
      await this.vtuService.purchaseAirtime({
        phone: body.phoneNumber,
        amount: Number(amount),
        network
      });
      
      return `END Airtime purchase of ₦${amount} for ${network} initiated`;
    }
    
    return `CON Invalid input. Try again`;
  }
}