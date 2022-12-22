import { PermissionModule } from "./permission/permission.module";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ExampleModule } from "./example/example.module";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + "/**/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
    }),
    AuthModule,
    ExampleModule,
    PermissionModule,
  ],
})
export class MainModule {}
