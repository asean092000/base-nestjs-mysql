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
import { BacklistService } from "src/common/backlist/backlist.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto";
import appConfig from "src/system/config.system/app.config";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private backlistService: BacklistService,
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
    await this.updateRtHash(user.id, rt);

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
    let hashedRt = '';
    if (rt) {
      const salt = await bcrypt.genSalt(BcryptSalt.SALT_ROUND);
      hashedRt = await bcrypt.hash(rt, salt);
    }

    await this.userService.update(userId,null, {hashedRt});
  }

  async refreshTokens(userId: number, rt: string): Promise<JWTResult> {
    const user = await this.userService.getOneById(userId);

    if (!user?.result || !user?.result?.hashedRt) throw new ForbiddenException("Access Denied");
    const rtMatches = await bcrypt.compare(rt, user?.result?.hashedRt);

    if (!rtMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.generateToken(user);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number, acToken:string): Promise<boolean> {
    await this.updateRtHash(userId, null);
    await this.backlistService.create({userId, acToken});
    return true;
  }
}
