import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto";
import { SuccessResponse, ErrorResponse } from 'src/core/BaseResponse/index';
import { STATUSCODE, MESSAGE, ERROR} from 'src/core/constants';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  private readonly logger = new Logger(AuthService.name);
  
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createDto: CreateUserDto) {
    try {
        const createdUser = await this.userService.create(createDto);
        const { password, ...rest } = createdUser;
  
        return rest;

    } catch (error) {
    }
  }
}
