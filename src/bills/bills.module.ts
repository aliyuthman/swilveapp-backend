import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/dabase.module';
import { BillersService } from './billers.service';
import { BillsController } from './bills.controller';

@Module({
  imports: [DatabaseModule],
  providers: [BillersService],
  controllers: [BillsController],
})
export class BillsModule {}