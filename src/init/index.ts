import { AppDataSource } from "./data-source";
import { User } from "src/components/user/user.entity";
import { Permission } from "src/components/permission/permission.entity";
import { UserRoles } from "src/components/user/enums/user.enum";

AppDataSource.initialize()
  .then(async () => {
    const roles = ["supper", "admin", "member"];
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
    console.log("Saved a new user with id: " + user.id);
    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);
    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));
