import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Users } from '../../generated/prisma/client';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { sign } from 'crypto';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

      return this.signToken(user.id, user.email);
    } catch (error) {
      console.log('error ', error);
      throw error;
    }
  }

  // sign a token generater for the user

  async signToken(userID: number, email: string): Promise<string> {
    const payload = { sub: userID, email };

    const accessToken: string = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: accessToken,
    };
  }
}
