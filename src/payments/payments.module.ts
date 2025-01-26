import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/dabase.module';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller'; // Fix import path

@Module({
  imports: [DatabaseModule],
  providers: [PaymentsService],
  controllers: [PaymentsController], // Add controller here
})
export class PaymentsModule {}