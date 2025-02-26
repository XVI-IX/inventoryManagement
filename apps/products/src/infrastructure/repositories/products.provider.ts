import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';
import { DataSource } from 'typeorm';

export const productSProvider = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Products),
    inject: ['DATA_SOURCE'],
  },
];
