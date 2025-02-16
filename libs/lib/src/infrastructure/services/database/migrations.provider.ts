import { DataSource } from 'typeorm';
import { envConfig } from '../../config/environment.config';
import { AddPermissions1739668593550 } from './migrations/1739668593550-AddPermissions';
import { Users } from './entities/user.entity';
import { Permissions, Roles } from './entities/rbac.entity';

export default new DataSource({
  type: 'mysql',
  host: envConfig.getDatabaseHost(),
  username: envConfig.getDatabaseUser(),
  password: envConfig.getDatabasePassword(),
  database: envConfig.getDatabaseName(),
  port: envConfig.getDatabasePort(),
  entities: [Users, Roles, Permissions],
  migrations: [AddPermissions1739668593550],
});
