import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { LocalStrategy } from "./local.stratery/local.strategy";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { jwtConfig } from "src/system/config.system/jwt.config";

@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
  providers: [AdminService, LocalStrategy, JwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
