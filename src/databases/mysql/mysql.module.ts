import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        useFactory: () => ({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT) || 3306,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: ['dist/**/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/*.{ts,js}'],
          migrationsTableName: 'typeorm_migrations',
          synchronize: true,
        }),
    }),
  ],
})
export class MysqlModule {}