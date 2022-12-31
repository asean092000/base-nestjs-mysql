import { BacklistModule } from './../common/backlist/backlist.module';
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PermissionModule } from "./permission/permission.module";
import { Module } from "@nestjs/common";
import { APP_GUARD } from '@nestjs/core';
import { ExampleModule } from "./example/example.module";
@Module({
    imports: [AuthModule, ExampleModule, PermissionModule, UserModule, BacklistModule],
})
export class MainModule {}
