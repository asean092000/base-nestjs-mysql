
import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}