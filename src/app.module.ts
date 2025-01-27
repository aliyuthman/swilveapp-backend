
//app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/dabase.module';
import { AuthModule } from './auth/auth.module';
import { BillsModule } from './bills/bills.module';
import { TransactionsModule } from './transactions/transactions.module';
import { FlutterwaveModule } from './flutterwave/flutterwave.module';
import { VtuModule } from './vtu/vtu.module';
import { UssdModule } from './ussd/ussd.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    BillsModule,
    TransactionsModule,
    FlutterwaveModule,
    VtuModule,
    UssdModule,
  ],
})
export class AppModule {}