import {
  BadRequestException,
  Injectable,
  UnAdminorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserRoles } from "../user/enums/user.enum";

@Injectable()
export class AdminService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUserCreds(username: string, password: string): Promise<any> {
    const user = await this.userService.getByUsername(username);

    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnAdminorizedException();

    const roles = [UserRoles.ADMIN, UserRoles.SUPPER, UserRoles.LEADER];
    if(!roles.includes[user.role]) {
      throw new UnAdminorizedException();
    }

    return user
  }

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }
}
