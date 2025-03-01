import { Controller, Inject, Logger } from '@nestjs/common';
import { RBACGeneralUseCaseProxyModule } from '../usecase-proxy/rbacGeneralUseCaseProxy.module';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { GetAllRolesUseCase } from '../../usecases/roles/getAllRoles.usecase';
import { GetUsersWithRoleUseCase } from '../../usecases/roles/getUsersWithRole.usecase';
import { GetRoleByIdUseCase } from '../../usecases/roles/getRoleById.usecase';
import { UpdateRoleUseCase } from '../../usecases/roles/updateRole.usecase';
import { GetAllRolesWithPermissionUseCase } from '../../usecases/roles/getAllRolesWithPermission.useCase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HttpResponse } from '@app/lib/infrastructure/helpers/response.helper';
import { ServiceInterface } from '@app/lib/domain/adapters';
import { Roles } from '@app/lib/infrastructure/services/database/entities/rbac.entity';
import { CreateRoleInput, UpdateRoleInput } from '../common/schema/rbac.schema';
import { CreateRoleUseCase } from '../../usecases/roles/createRole.usecase';

@Controller()
export class RoleController {
  private readonly logger: Logger;

  constructor(
    @Inject(RBACGeneralUseCaseProxyModule.GET_ALL_ROLES_USE_CASE_PROXY)
    private readonly getAllRolesUseCase: UseCaseProxy<GetAllRolesUseCase>,
    @Inject(RBACGeneralUseCaseProxyModule.GET_ALL_ROLE_USERS_USE_CASE_PROXY)
    private readonly getAllRoleUsersUseCase: UseCaseProxy<GetUsersWithRoleUseCase>,
    @Inject(RBACGeneralUseCaseProxyModule.GET_ROLE_BY_ID_USE_CASE_PROXY)
    private readonly getRoleByIdUseCase: UseCaseProxy<GetRoleByIdUseCase>,
    @Inject(RBACGeneralUseCaseProxyModule.UPDATE_ROLE_USE_CASE_PROXY)
    private readonly updateRoleUseCase: UseCaseProxy<UpdateRoleUseCase>,
    @Inject(
      RBACGeneralUseCaseProxyModule.GET_ALL_ROLES_WITH_PERMISSION_USE_CASE_PROXY,
    )
    private readonly getAllRolesWithPermissionUseCase: UseCaseProxy<GetAllRolesWithPermissionUseCase>,
    @Inject(RBACGeneralUseCaseProxyModule.CREATE_ROLE_USE_CASE_PROXY)
    private readonly createRoleUseCase: UseCaseProxy<CreateRoleUseCase>,
  ) {
    this.logger = new Logger(RoleController.name);
  }

  @MessagePattern('createRole')
  async createRole(data: CreateRoleInput): Promise<ServiceInterface<Roles>> {
    try {
      const role = await this.createRoleUseCase.getInstance().execute(data);

      return HttpResponse.send('Role created', role);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @MessagePattern('getAllRoles')
  async getAllRoles(): Promise<ServiceInterface<Roles[]>> {
    try {
      const role = await this.getAllRolesUseCase.getInstance().execute();

      return HttpResponse.send('Roles retrieved', role);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @MessagePattern('getRoleById')
  async getRoleById(
    @Payload() data: { roleId: string },
  ): Promise<ServiceInterface<Roles>> {
    try {
      const role = await this.getRoleByIdUseCase
        .getInstance()
        .execute(data.roleId);

      return HttpResponse.send('Role retrieved', role);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @MessagePattern('getAllRoleUsers')
  async getAllRoleUsers(
    @Payload() data: { roleName: string },
  ): Promise<ServiceInterface<Roles>> {
    try {
      const role = await this.getAllRoleUsersUseCase
        .getInstance()
        .execute(data.roleName);

      return HttpResponse.send('Role users retrieved', role);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @MessagePattern('updateRole')
  async updateRole(
    @Payload() data: { roleId: string; entity: UpdateRoleInput },
  ): Promise<any> {
    try {
      const role = await this.updateRoleUseCase
        .getInstance()
        .execute(data.roleId, data.entity);

      return HttpResponse.send('Role updated', role);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @MessagePattern('getAllRolesWithPermission')
  async getAllRolesWithPermission(
    @Payload() data: { permissionName: string },
  ): Promise<ServiceInterface<Roles>> {
    try {
      const roles = await this.getAllRolesWithPermissionUseCase
        .getInstance()
        .execute(data.permissionName);

      return HttpResponse.send('Roles retrieved', roles);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
