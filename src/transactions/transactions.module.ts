import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/dabase.module';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [DatabaseModule],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}