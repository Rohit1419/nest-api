import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signUp() {
    return 'user is signedUp';
  }

  signIn() {
    return 'user is signedIn';
  }
}
