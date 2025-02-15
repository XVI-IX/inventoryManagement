import { Roles } from '@app/lib/infrastructure/services/database/entities/rbac.entity';
import { DataSource } from 'typeorm';

export const rbacProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Roles),
    inject: ['DATA_SOURCE'],
  },
];
