import {
  Permissions,
  Roles,
} from '@app/lib/infrastructure/services/database/entities/rbac.entity';
import { DataSource } from 'typeorm';

export const rbacProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Roles),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PERMISSIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Permissions),
    inject: ['DATA_SOURCE'],
  },
];
