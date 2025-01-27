// src/bills/billers.service.ts (fix filename typo from billlers)
import { Injectable } from '@nestjs/common';
import { FlutterwaveService } from '../flutterwave/flutterwave.service';

@Injectable()
export class BillersService {
  constructor(private readonly flwService: FlutterwaveService) {}

  async getCategories() {
    return this.flwService.getBillCategories();
  }

  async getBillers(categoryId: string) {
    return this.flwService.getBillers(categoryId);
  }
}