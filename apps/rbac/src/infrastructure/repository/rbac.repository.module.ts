import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { rbacProviders } from './rbac.providers';
import { RolesRepository } from './roles.repository';
import { PermissionsRepository } from './permissions.repository';

@Module({
  imports: [DatabaseModule],
  providers: [...rbacProviders, RolesRepository, PermissionsRepository],
  controllers: [],
  exports: [RolesRepository, PermissionsRepository],
})
export class RbacRepositoryModule {}
