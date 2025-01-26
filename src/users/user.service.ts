import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  // Add this method if missing
  async findByEmail(email: string) {
    return this.db.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }
}