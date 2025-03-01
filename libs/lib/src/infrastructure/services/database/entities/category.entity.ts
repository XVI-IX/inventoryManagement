import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './products.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar')
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  products: Products[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
