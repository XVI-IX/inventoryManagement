import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Suppliers } from './suppliers.entity';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stockQuantity: number;

  @Column('int')
  lowStockThreshold: number;

  @Column('varchar')
  sku: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  barcode: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: Category;

  @ManyToOne(() => Suppliers, (supplier) => supplier.products, {
    onDelete: 'SET NULL',
  })
  supplier: Suppliers;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

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
