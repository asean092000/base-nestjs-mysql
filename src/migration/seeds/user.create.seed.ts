import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { UserRoles } from 'src/components/user/enums/user.enum';
import { User } from 'src/components/user/user.entity';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE users');
    await factory(User)().create({
      name: 'super',
      email: 'super@super.com',
      username: 'super',
      password: 'Password@123',
      role: UserRoles.ADMIN,
    });
    // await factory(User)().createMany(20);
  }
}
