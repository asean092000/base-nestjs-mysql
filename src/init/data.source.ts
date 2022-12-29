import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "src/components/user/user.entity";
import { Permission } from "src/components/permission/permission.entity";
export const AppDataSource = new DataSource({
  type: "mysql",
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'mauFJcuf5dhRMQrjj',
  database: 'nestjs_core',
  synchronize: true,
  logging: true,
  entities: [User, Permission],
  migrations: [],
  subscribers: [],
});
