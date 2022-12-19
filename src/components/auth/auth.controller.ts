import { User } from './../users/users.service';
import { Controller, Request, Post, Body, SetMetadata } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Roles } from "src/core/guards/roles.decorator";
import { Role } from "src/core/guards/role.enum";
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
  @Roles(Role.CUSTOMER)
  @ApiOperation({
    description: 'Login to the system',
  })
  async login(@Request() req, @Body() loginDto: LogInDto) {
    return this.authService.login(req.user);
  }
}
