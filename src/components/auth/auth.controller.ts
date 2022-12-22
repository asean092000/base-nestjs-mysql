import { Controller, Request, Post, Body } from "@nestjs/common";
import { Response } from "src/core/interfaces"; 
import { AuthService } from "./auth.service";
import { JWTResult } from "src/core/interfaces";
import { User } from "../user/user.entity";
import { CreateUserDto } from "../user/dto";
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
  @ApiOkResponse({
    type: Response<JWTResult>,
  })
  async login(@Request() req, @Body() loginDto: LogInDto) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({
    description: 'Register user',
  })
  @ApiOkResponse({
    type: Response<User>,
  })
  async register(@Body() registerDto: CreateUserDto) {
    return await this.authService.register(registerDto);
  }
}
