import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RtAuthGuard } from './rt/jwt-auth.guard';
import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LocalAuthGuard } from "./local.stratery/local-auth.guard";
import { JWTResult } from "src/system/interfaces";
import { Response } from "src/system/interfaces";
import { User } from "../user/user.entity";
import { CreateUserDto } from "../user/dto";
import { GetCurrentUserId, GetCurrentUser } from "src/common/decorators";

@ApiTags("Auth")
@Controller("api/v1/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    description: "In general, logon is the procedure used to get access to an operating system or application.",
  })
  @ApiOkResponse({
    type: Response<JWTResult>,
  })
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<JWTResult> {
    return this.authService.generateToken(req.user);
  }

  @Post("register")
  @ApiOperation({
    description: "User Registration means entering User data into the System at Contact Points or through the Customer Zone. By registering, the User is given access to several additional features of the System.",
  })
  @ApiOkResponse({
    type: Response<User>,
  })
  async register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @ApiBearerAuth("Authorization")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: "To exit a user account in a computer system, so that one is not recognized until signing in again.",
  })
  logout(@GetCurrentUserId() userID: number): Promise<boolean> {
    return this.authService.logout(userID);
  }

  @Post('refresh')
  @ApiBearerAuth("Authorization")
  @UseGuards(RtAuthGuard)
  @ApiOperation({
    description: "When designing a web application, along with security authentication is one of the key parts. Authentication with tokens was a breakthrough in this regard, and the refresh token came to complement it and make it usable.",
  })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<JWTResult> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
