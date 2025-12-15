import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/gaurd';

// the nestjs guard uses checks the authguard of paassport for the jwt validation.

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
