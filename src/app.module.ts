import { Module } from "@nestjs/common";
import { MainModule } from "./components/main.module";
import { ConfigSystemModule } from "./core/config/config.module";
import { LoggerModule } from "./core/middleware/logger.module";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./components/guards/roles.guard";

@Module({
  imports: [
    ConfigSystemModule,
    ConfigModule.forRoot(),
    LoggerModule,
    MainModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
