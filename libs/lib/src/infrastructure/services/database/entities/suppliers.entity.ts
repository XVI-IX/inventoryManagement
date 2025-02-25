import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './products.entity';

@Entity('suppliers')
export class Suppliers {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phoneNumber: string;

  @Column('varchar')
  address: string;

  @OneToMany(() => Products, (product) => product.supplier)
  products: Products[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
