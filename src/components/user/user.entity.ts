import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ unique: true, nullable: false })
  public username: string;

  @Column({ nullable: false })
  public password: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "createdAt",
  })
  public createdAt!: Date;

  @Column({ nullable: false, default: -1 })
  permissionId: number;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updatedAt",
  })
  public updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
