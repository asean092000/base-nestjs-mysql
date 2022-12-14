import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { UserRoles } from "./enums/user.enum";
import { BcryptSalt } from "src/system/constants/bcrypt.salt";
import { REGEX, MESSAGES } from "../../system/config.system/app.utils";
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false })
  public name: string;

  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ unique: true, nullable: false })
  public username: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: true })
  public hashedRt: string;

  @Column({ type: "enum", enum: UserRoles, default: UserRoles.MEMBER })
  role: UserRoles;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "createdAt",
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updatedAt",
  })
  public updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(BcryptSalt.SALT_ROUND);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
