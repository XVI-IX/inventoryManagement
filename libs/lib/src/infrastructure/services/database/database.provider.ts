import { DataSource } from 'typeorm';
import { envConfig } from '../../config/environment.config';
import { Users } from './entities/user.entity';

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
        entities: [Users],
        // synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
