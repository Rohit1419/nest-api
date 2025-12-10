import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// the nestjs guard uses cjecks the authguard of paassport for the jwt validation.
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  @Get('profile')
  getProfile() {
    return { message: `You're logged in:` };
  }
}
