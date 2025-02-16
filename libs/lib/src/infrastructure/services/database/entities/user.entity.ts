import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './rbac.entity';

// export enum UserRole {
//   ADMIN = 'admin',
//   USER = 'user',
// }

export enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column('varchar', { length: 500 })
  firstName: string;

  @Column('varchar', { length: 500 })
  lastName: string;

  @Column('varchar')
  email: string;

  @ManyToOne(() => Roles, (role) => role.users, { nullable: false })
  role: Roles;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: string;

  @Column({ type: 'varchar', default: null })
  profileImage?: string;

  @Column()
  jobTitle?: string;

  @Column({ type: 'varchar', default: null })
  resetToken?: string;

  @Column({ type: 'datetime', default: null })
  resetTokenExpires?: Date;

  @Column('varchar')
  password: string;

  @Column({ type: 'datetime', default: null })
  lastLogin?: Date;

  @Column({ type: 'boolean', default: false })
  tfaEnabled: boolean;

  @Column({ type: 'varchar', default: null })
  googleProfileId?: string;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'varchar', default: null })
  verificationToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
