import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Suppliers } from './suppliers.entity';
import { Category } from './category.entity';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  brand: string;

  @Column('varchar')
  uom: string;

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
export { Category };
