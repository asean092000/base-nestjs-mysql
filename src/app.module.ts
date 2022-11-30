import { Module } from '@nestjs/common';
import { MainModule }  from './components/main.module';
import { ConfigModule } from './core/config/config.module';
import { LoggerModule } from './core/middleware/logger.module';
import { MysqlModule } from './databases/mysql/mysql.module';
@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    MysqlModule,
    MainModule
  ],
})
export class AppModule {}
