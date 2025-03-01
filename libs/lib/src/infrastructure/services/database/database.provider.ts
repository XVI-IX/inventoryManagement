import { DataSource } from 'typeorm';
import { envConfig } from '../../config/environment.config';
import { Users } from './entities/user.entity';
import { Permissions, Roles } from './entities/rbac.entity';
import { AddPermissions1739668593550 } from './migrations/1739668593550-AddPermissions';
import { Products } from './entities/products.entity';
import { Category } from './entities/category.entity';
import { Suppliers } from './entities/suppliers.entity';

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
        entities: [Users, Roles, Permissions, Products, Suppliers, Category],
        migrations: [AddPermissions1739668593550],
        // synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
