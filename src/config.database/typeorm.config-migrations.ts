import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
 
config();
 
const configService = new ConfigService();
 
export default new DataSource({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: parseInt(process.env.DB_PORT, 10),
    username: configService.get('DB_USER'),
    database: configService.get('DB_NAME'),
    password: configService.get('DB_PASSWORD'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    extra: {
      charset: 'utf8_unicode_ci',
    },
    synchronize: false,
    logging: true,
});
