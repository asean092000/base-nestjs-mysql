import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: '',
  port: 3000,
  logLevel: 'info',
  gatekeeperServiceUrl: undefined,
  mysql: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password:'',
    database: 'root',
    entities: ['dist/**/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*.{ts,js}'],
    migrationsTableName: 'typeorm_migrations',
    synchronize: true,
  }
};
