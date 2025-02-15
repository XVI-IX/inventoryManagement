import { DataSource } from 'typeorm';
import { envConfig } from '../../config/environment.config';
import { Users } from './entities/user.entity';
import {
  Permissions,
  RolePermissions,
  Roles,
  UserRoles,
} from './entities/rbac.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: envConfig.getDatabaseHost(),
        port: envConfig.getDatabasePort(),
        username: envConfig.getDatabaseUser(),
        password: envConfig.getDatabasePassword(),
        database: envConfig.getDatabaseName(),
        entities: [Users, Roles, Permissions, RolePermissions, UserRoles],
        // synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
