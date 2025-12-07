import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { dot } from 'node:test/reporters';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    console.log('DTO ', dto);
    return this.authService.signUp(dto);
  }

  @Get('signin')
  async signIn() {
    return await this.authService.signIn();
  }
}
