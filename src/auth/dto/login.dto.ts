import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber('NG')
  phone: string;

  @IsString()
  password: string;
}