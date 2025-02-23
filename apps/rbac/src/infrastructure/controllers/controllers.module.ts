import { Module } from '@nestjs/common';
import { RbacRepositoryModule } from '../repository/rbac.repository.module';
import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { RoleController } from './role.controller';
import { PermissionController } from './permission.controller';

@Module({
  imports: [RbacRepositoryModule, DatabaseModule],
  providers: [RoleController, PermissionController],
})
export class RBACControllerModule {}
