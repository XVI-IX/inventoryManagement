import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column('varchar')
  roleId: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: string;

  @Column()
  jobTitle: string;

  @Column('varchar')
  password: string;

  @Column('datetime')
  lastLogin: Date;

  @Column('boolean')
  tfaEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
