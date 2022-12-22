import { Controller, Request, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LogInDto } from "./dto/index";
@Controller('/api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({
    description: 'Login to the system',
  })
  async login(@Request() req, @Body() loginDto: LogInDto) {
    return this.authService.login(req.user);
  }
}
