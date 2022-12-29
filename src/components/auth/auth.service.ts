import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./../user/dto/update.dto";
import { BcryptSalt } from "./../../system/constants/bcrypt.salt";
import { UserInterface } from "./../../system/interfaces/user.interface";
import { JwtPayload } from "./../../system/interfaces/jwt.payload.interface";
import { JWTResult } from "src/system/interfaces";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto";
import appConfig from "src/system/config.system/app.config";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUserCreds(username: string, password: string): Promise<any> {
    const user = await this.userService.getByUsername(username);

    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }

  async generateToken(user: UserInterface): Promise<JWTResult> {
    const jwtPayload: JwtPayload = {
      sub: user.id,
      name: user.name,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: appConfig().atSecret,
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: appConfig().rtSecret,
        expiresIn: "7d",
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async register(createDto: CreateUserDto) {
    const createdUser = await this.userService.create(createDto);
    const { password, ...rest } = createdUser;

    return rest;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const salt = await bcrypt.genSalt(BcryptSalt.SALT_ROUND);
    const hash = await bcrypt.hash(rt, salt);
    const updateUser = new UpdateUserDto();
    updateUser.hash = hash;
    await this.userService.update(userId, updateUser);
  }

  async refreshTokens(userId: number, rt: string): Promise<JWTResult> {
    const user = await this.userService.getOneById(userId);

    if (!user || !user.hashedRt) throw new ForbiddenException("Access Denied");

    const rtMatches = await bcrypt.compare(rt, user.rt);
    if (!rtMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.generateToken(user);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.updateRtHash(userId, "");

    return true;
  }

  async signinLocal(loginDto: LoginDto): Promise<JWTResult> {
    const user = await this.userService.getByUsername(loginDto.username);

    if (!user) throw new ForbiddenException("Access Denied");

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!passwordMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.generateToken(user);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
}
