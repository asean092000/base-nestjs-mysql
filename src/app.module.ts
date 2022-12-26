import { Module } from "@nestjs/common";
import { MainModule } from "./components/main.module";
import { ConfigSystemModule } from "./core/config.system/config.module";
import { LoggerModule } from "./core/middleware/logger.module";
import { ConfigModule } from "@nestjs/config";
import { typeOrmAsyncConfig } from './config.database/typeorm.config';
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    ConfigSystemModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot(),
    LoggerModule,
    MainModule,
  ],
})
export class AppModule {}
