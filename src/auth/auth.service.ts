import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { users } from '../database/schema';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async signUp(phone: string, email: string, password: string) {
    const existingUser = await this.db.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.phone, phone),
    });

    if (existingUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 12);
    const [newUser] = await this.db.db.insert(users).values({
      phone,
      email,
      passwordHash: hashedPassword,
    }).returning();

    return { accessToken: this.jwtService.sign({ sub: newUser.id }) };
  }


  async login(phone: string, password: string) {
    const user = await this.db.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.phone, phone),
    });
  
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    return {
      access_token: this.jwtService.sign({ sub: user.id }),
    };
  }
}