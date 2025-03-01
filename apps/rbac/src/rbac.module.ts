import { Module } from '@nestjs/common';
import { RbacController } from './rbac.controller';
import { RbacService } from './rbac.service';
import { RBACGeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/rbacGeneralUseCaseProxy.module';
import { RoleController } from './infrastructure/controllers/role.controller';
import { PermissionController } from './infrastructure/controllers/permission.controller';

@Module({
  imports: [RBACGeneralUseCaseProxyModule.register()],
  controllers: [RoleController, PermissionController],
  providers: [RbacService],
})
export class RbacModule {}
