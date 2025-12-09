import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Users } from '../../generated/prisma/client';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  // looger
  private logger = new Logger('AuthService');
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

      const access_token = await this.signToken(user.id, user.email);

      return {
        message: 'User created successfully',
        ...access_token,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.error(error.message);
        throw new ForbiddenException('Email already exists');
      }
      console.log(error);
      throw error;
    }
  }

  // sign in logic here

  async signIn() {}

  // sign a token generater for the user

  async signToken(
    userID: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userID, email };

    const access_token: string = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    return { access_token };
  }
}
