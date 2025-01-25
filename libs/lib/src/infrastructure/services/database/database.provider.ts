import { DataSource } from 'typeorm';
import { envConfig } from '../../config/environment.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: envConfig.getDatabaseHost(),
        port: envConfig.getDatabasePort(),
        username: envConfig.getDatabaseUser(),
        password: envConfig.getDatabaseHost(),
        database: envConfig.getDatabaseName(),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
