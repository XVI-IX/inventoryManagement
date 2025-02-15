import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { rbacProviders } from './rbac.providers';
import { RolesRepository } from './roles.repository';

@Module({
  imports: [DatabaseModule],
  providers: [...rbacProviders, RolesRepository],
  exports: [RolesRepository],
})
export class RbacRepositoryModule {}
