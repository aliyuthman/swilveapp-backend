//signup.dto.ts

import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsPhoneNumber('NG') // Validates Nigerian phone numbers (+234...)
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}