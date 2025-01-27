// src/flutterwave/flutterwave.service.ts
import { Injectable } from '@nestjs/common';
import Flutterwave from 'flutterwave-node-v3';

@Injectable()
export class FlutterwaveService {
  private flw = new (Flutterwave as any)(
    process.env.FLW_PUBLIC_KEY,
    process.env.FLW_SECRET_KEY,
  );

  async getBillCategories() {
    return this.flw.Bills.get_categories();
  }

  async getBillers(categoryId: string) {
    return this.flw.Bills.get_billers({ category: categoryId });
  }
}