import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PermissionModule } from "./permission/permission.module";
import { Module } from "@nestjs/common";
import { ExampleModule } from "./example/example.module";
@Module({
  imports: [AuthModule, ExampleModule, PermissionModule, UserModule],
})
export class MainModule {}
