import { Injectable, Global } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Global()
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = process.env.DATABASE_URL!;
    const adapter = new PrismaPg({ connectionString });

    console.log('db connecting to', connectionString);

    super({ adapter });
  }
}
