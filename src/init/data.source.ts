import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "src/components/user/user.entity";
import { Permission } from "src/components/permission/permission.entity";
import dataConfig from './data.config'
export const AppDataSource = new DataSource({
  type: "mysql",
  host: dataConfig().host,
  port: dataConfig().port,
  username: dataConfig().username,
  password: dataConfig().password,
  database: dataConfig().database,
  synchronize: true,
  logging: true,
  entities: [User, Permission],
  migrations: [],
  subscribers: [],
});
