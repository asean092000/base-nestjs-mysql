import { AppDataSource } from "./data.source";
import { User } from "src/components/user/user.entity";
import { Permission } from "src/components/permission/permission.entity";
import { UserRoles } from "src/components/user/enums/user.enum";

AppDataSource.initialize()
  .then(async () => {
    const roles = [UserRoles.SUPPER, UserRoles.ADMIN, UserRoles.MEMBER];
    roles.map((role) => {
      const permission = new Permission();
      permission.role = role;
      AppDataSource.manager.save(permission);
    });
    const user = new User();
    user.email = "super@super.com";
    user.username = "super9999";
    user.name = "super";
    user.password = "super@9999ps";
    user.role = UserRoles.SUPPER;
    await AppDataSource.manager.save(user);
    process.exit()
  })
  .catch((error) => console.log(error));
