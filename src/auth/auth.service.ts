import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Users } from '../../generated/prisma/client';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // signup logic here
  async signUp(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.hash);

      const user = await this.prisma.users.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          hash: hash,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });

      return user;
    } catch (error) {
      console.log('error ', error);
      throw error;
    }
  }

  async signIn() {
    const user = await this.prisma.users.findMany({});
    return user;
  }
}
