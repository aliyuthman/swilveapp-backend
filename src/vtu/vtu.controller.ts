// src/vtu/vtu.controller.ts
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VtuService } from './vtu.service';
import { VtuAirtimeDto } from './dto/vtu-airtime.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vtu')
export class VtuController {
  constructor(private readonly vtuService: VtuService) {}

  @Post('airtime')
  @UseGuards(JwtAuthGuard)
  async purchaseAirtime(@Body() dto: VtuAirtimeDto) {
    return this.vtuService.purchaseAirtime(dto);
  }
}