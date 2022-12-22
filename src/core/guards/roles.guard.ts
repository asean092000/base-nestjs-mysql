import { User } from "src/components/users/user.entity";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./role.enum";
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();

    const user: User = {
      username: "Nishant",
      password: '123456',
      roles: [Role.CUSTOMER],
    };

    return requireRoles.some((role) => user.roles.includes(role));
  }
}
