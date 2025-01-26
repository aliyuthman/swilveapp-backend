import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/dabase.module'; // Import DatabaseModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // Will create this next

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '15m' },
    }),
    DatabaseModule, // Add DatabaseModule here
  ],
  providers: [AuthService],
  controllers: [AuthController], // Controller declaration
})
export class AuthModule {}