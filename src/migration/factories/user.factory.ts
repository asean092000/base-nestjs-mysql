import { randEmail, randFullName, randPassword, randUserName } from '@ngneat/falso';
import { define } from 'typeorm-seeding';
import { User } from 'src/components/user/user.entity';

define(User, () => {
  const user = new User();
  user.name = randFullName();
  user.email = randEmail();
  user.username = randUserName();
  user.password = randPassword();
  return user;
});
