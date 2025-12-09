import { Controller, Get } from '@nestjs/common';
import { userInfo } from 'os';

@Controller('user')
export class UserController {
  @Get('profile')
  getProfile() {
    return { message: 'This is the user profile' };
  }
}
