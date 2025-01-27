
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Add ConfigService
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/dabase.module';

@Module({
  imports: [  
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Add this
      inject: [ConfigService], // Add this
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), // Get from ConfigService
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],

  controllers: [AuthController], // Add this line
  providers: [AuthService], // Add this line
})
export class AuthModule {}