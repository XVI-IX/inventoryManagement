import { Suppliers } from '@app/lib/infrastructure/services/database/entities/suppliers.entity';
import { DataSource } from 'typeorm';

export const suppliersProviders = [
  {
    provide: 'SUPPLIERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Suppliers),
    inject: ['DATA_SOURCE'],
  },
];
