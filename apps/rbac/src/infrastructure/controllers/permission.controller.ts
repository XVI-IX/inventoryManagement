import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RBACGeneralUseCaseProxyModule } from '../usecase-proxy/rbacGeneralUseCaseProxy.module';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { GetAllPermissionsUseCase } from '../../usecases/permissions/getAllPermissions.usecase';
import { HttpResponse } from '@app/lib/infrastructure/helpers/response.helper';
import { DeletePermissionUseCase } from '../../usecases/permissions/deletePermission.usecase';
import { GetPermissionByNameOrIdUseCase } from '../../usecases/permissions/getPermissionByNameOrId.usecase';
import { UpdatePermissonUseCase } from '../../usecases/permissions/updatePermission.usecase';
import { Permissions } from '@app/lib/infrastructure/services/database/entities/rbac.entity';
import { AssignPermissionToRoleUseCase } from '../../usecases/permissions/assignPermissionToRole.usecase';

@Controller()
export class PermissionController {
  private readonly logger: Logger;
  constructor(
    @Inject(RBACGeneralUseCaseProxyModule.GET_ALL_PERMISSIONS_USE_CASE_PROXY)
    private readonly getAllPermissionsUseCase: UseCaseProxy<GetAllPermissionsUseCase>,
    @Inject(RBACGeneralUseCaseProxyModule.DELETE_PERMISSIONS_USE_CASE_PROXY)
    private readonly deletePermissionUseCase: UseCaseProxy<DeletePermissionUseCase>,
    @Inject(
      RBACGeneralUseCaseProxyModule.GET_PERMISSION_BY_NAME_OR_ID_USE_CASE_PROXY,
    )
    private readonly getPermissionByNameOrIdUseCase: UseCaseProxy<GetPermissionByNameOrIdUseCase>,
    @Inject(RBACGeneralUseCaseProxyModule.UPDATE_PERMISSION_BY_USE_CASE_PROXY)
    private readonly updatePermissionUseCase: UseCaseProxy<UpdatePermissonUseCase>,
    @Inject(
      RBACGeneralUseCaseProxyModule.ASSIGN_PERMISSION_TO_ROLE_USE_CASE_PROXY,
    )
    private readonly assignPermissionToRoleUseCase: UseCaseProxy<AssignPermissionToRoleUseCase>,
  ) {
    this.logger = new Logger(PermissionController.name);
  }

  @MessagePattern('getAllPermissions')
  async getAllPermissions(): Promise<any> {
    try {
      const permissions = await this.getAllPermissionsUseCase
        .getInstance()
        .execute();

      return HttpResponse.send('Permissions retrieved', permissions);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @MessagePattern('deletePermission')
  async deletePermission(
    @Payload() data: { permissionId: string },
  ): Promise<any> {
    try {
      const permission = await this.deletePermissionUseCase
        .getInstance()
        .execute(data.permissionId);

      return HttpResponse.send('Permission deleted', permission);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @MessagePattern('getPermissionByNameOrId')
  async getPermissionByNameOrId(
    @Payload() data: { name: string; permissionId: string },
  ) {
    try {
      const permission = await this.getPermissionByNameOrIdUseCase
        .getInstance()
        .execute(data.name, data.permissionId);

      return HttpResponse.send('Permission retrieved', permission);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @MessagePattern('updatePermission')
  async updatePermission(
    @Payload() data: { permissionId: string; entity: Partial<Permissions> },
  ) {
    try {
      const permission = await this.updatePermissionUseCase
        .getInstance()
        .execute(data.permissionId, data.entity);

      return HttpResponse.send('Permission updated', permission);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @MessagePattern('assignPermissionToRole')
  async assignPermissionToRole(
    @Payload() data: { roleId: string; permissionId: string },
  ) {
    try {
      const results = await this.assignPermissionToRoleUseCase
        .getInstance()
        .execute(data.roleId, data.permissionId);

      return HttpResponse.send('Permission assigned', results);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
