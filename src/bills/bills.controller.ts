import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { BillersService } from './billers.service';

@Controller('bills')
export class BillsController {
  constructor(private readonly billersService: BillersService) {}

  @Get('categories')
  getCategories() {
    return this.billersService.getCategories();
  }

  @Get('billers')
  getBillers(@Query('categoryId') categoryId: string) {
    return this.billersService.getBillers(categoryId);
  }

  @Post('validate')
  validateCustomer(@Body() dto: { billerId: string; customerId: string }) {
    return this.billersService.validateCustomerId(dto.billerId, dto.customerId);
  }
}