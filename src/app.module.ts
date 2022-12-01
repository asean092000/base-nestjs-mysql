import { Module } from '@nestjs/common';
import { MainModule }  from './components/main.module';
import { ConfigSystemModule } from './core/config/config.module';
import { LoggerModule } from './core/middleware/logger.module';
import { MysqlModule } from './databases/mysql/mysql.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigSystemModule,
    ConfigModule.forRoot(),
    LoggerModule,
    MysqlModule,
    MainModule
  ],
})
export class AppModule {}
