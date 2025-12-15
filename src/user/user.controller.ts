import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/gaurd';
import { GetUser } from 'src/auth/decorator';

// the nestjs guard uses checks the authguard of paassport for the jwt validation.

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('profile')
  getProfile(@GetUser() user) {
    return user;
  }
}
