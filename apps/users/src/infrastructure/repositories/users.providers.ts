import { Users } from '@app/lib/infrastructure/services/database/entities/user.entity';
import { DataSource } from 'typeorm';

export const userProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
    inject: ['DATA_SOURCE'],
  },
];
