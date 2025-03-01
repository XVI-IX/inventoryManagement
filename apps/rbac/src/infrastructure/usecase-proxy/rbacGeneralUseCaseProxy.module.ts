import { DynamicModule, Module } from '@nestjs/common';
import { RbacRepositoryModule } from '../repository/rbac.repository.module';
import { UserRepositoryModule } from 'apps/users/src/infrastructure/repositories/user.repository.module';
import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { RolesRepository } from '../repository/roles.repository';
import { PermissionsRepository } from '../repository/permissions.repository';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { GetAllPermissionsUseCase } from '../../usecases/permissions/getAllPermissions.usecase';
import { DeletePermissionUseCase } from '../../usecases/permissions/deletePermission.usecase';
import { GetPermissionByNameOrIdUseCase } from '../../usecases/permissions/getPermissionByNameOrId.usecase';
import { UpdatePermissonUseCase } from '../../usecases/permissions/updatePermission.usecase';
import { GetAllRolesUseCase } from '../../usecases/roles/getAllRoles.usecase';
import { GetUsersWithRoleUseCase } from '../../usecases/roles/getUsersWithRole.usecase';
import { UsersRepository } from 'apps/users/src/infrastructure/repositories/user.repository';
import { GetRoleByIdUseCase } from '../../usecases/roles/getRoleById.usecase';
import { GetAllRolesWithPermissionUseCase } from '../../usecases/roles/getAllRolesWithPermission.useCase';
import { AssignPermissionToRoleUseCase } from '../../usecases/permissions/assignPermissionToRole.usecase';
import { UpdateRoleUseCase } from '../../usecases/roles/updateRole.usecase';
import { CreateRoleUseCase } from '../../usecases/roles/createRole.usecase';

@Module({
  imports: [DatabaseModule, RbacRepositoryModule, UserRepositoryModule],
})
export class RBACGeneralUseCaseProxyModule {
  static GET_ALL_PERMISSIONS_USE_CASE_PROXY =
    'GET_ALL_PERMISSIONS_USE_CASE_PROXY';
  static DELETE_PERMISSIONS_USE_CASE_PROXY =
    'DELETE_PERMISSIONS_USE_CASE_PROXY';
  static GET_PERMISSION_BY_NAME_OR_ID_USE_CASE_PROXY =
    'GET_PERMISSION_BY_NAME_OR_ID_USE_CASE_PROXY';
  static UPDATE_PERMISSION_BY_USE_CASE_PROXY =
    'UPDATE_PERMISSION_BY_USE_CASE_PROXY';
  static ASSIGN_PERMISSION_TO_ROLE_USE_CASE_PROXY =
    'ASSIGN_PERMISSION_TO_ROLE_USE_CASE_PROXY';

  // Roles
  static GET_ALL_ROLES_USE_CASE_PROXY = 'GET_ALL_ROLES_USE_CASE_PROXY';
  static GET_ALL_ROLE_USERS_USE_CASE_PROXY =
    'GET_ALL_ROLE_USERS_USE_CASE_PROXY';
  static GET_ROLE_BY_ID_USE_CASE_PROXY = 'GET_ROLE_BY_ID_USE_CASE_PROXY';
  static GET_ALL_ROLES_WITH_PERMISSION_USE_CASE_PROXY =
    'GET_ALL_ROLES_WITH_PERMISSION_USE_CASE_PROXY';
  static UPDATE_ROLE_USE_CASE_PROXY = 'UPDATE_ROLE_USE_CASE_PROXY';
  static CREATE_ROLE_USE_CASE_PROXY = 'CREATE_ROLE_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: RBACGeneralUseCaseProxyModule,
      providers: [
        {
          inject: [PermissionsRepository],
          provide:
            RBACGeneralUseCaseProxyModule.GET_ALL_PERMISSIONS_USE_CASE_PROXY,
          useFactory: (permissionRepository: PermissionsRepository) =>
            new UseCaseProxy(
              new GetAllPermissionsUseCase(permissionRepository),
            ),
        },
        {
          inject: [PermissionsRepository],
          provide:
            RBACGeneralUseCaseProxyModule.DELETE_PERMISSIONS_USE_CASE_PROXY,
          useFactory: (permissionsRepository: PermissionsRepository) =>
            new UseCaseProxy(
              new DeletePermissionUseCase(permissionsRepository),
            ),
        },
        {
          inject: [PermissionsRepository],
          provide:
            RBACGeneralUseCaseProxyModule.GET_PERMISSION_BY_NAME_OR_ID_USE_CASE_PROXY,
          useFactory: (permissionsRepository: PermissionsRepository) =>
            new UseCaseProxy(
              new GetPermissionByNameOrIdUseCase(permissionsRepository),
            ),
        },
        {
          inject: [PermissionsRepository],
          provide:
            RBACGeneralUseCaseProxyModule.UPDATE_PERMISSION_BY_USE_CASE_PROXY,
          useFactory: (permissionRepository: PermissionsRepository) =>
            new UseCaseProxy(new UpdatePermissonUseCase(permissionRepository)),
        },
        {
          inject: [RolesRepository],
          provide: RBACGeneralUseCaseProxyModule.GET_ALL_ROLES_USE_CASE_PROXY,
          useFactory: (rolesRepository: RolesRepository) =>
            new UseCaseProxy(new GetAllRolesUseCase(rolesRepository)),
        },
        {
          inject: [RolesRepository, UsersRepository],
          provide:
            RBACGeneralUseCaseProxyModule.GET_ALL_ROLE_USERS_USE_CASE_PROXY,
          useFactory: (
            rolesRepository: RolesRepository,
            usersRepository: UsersRepository,
          ) =>
            new UseCaseProxy(
              new GetUsersWithRoleUseCase(rolesRepository, usersRepository),
            ),
        },
        {
          inject: [RolesRepository],
          provide: RBACGeneralUseCaseProxyModule.GET_ROLE_BY_ID_USE_CASE_PROXY,
          useFactory: (rolesRepository: RolesRepository) =>
            new UseCaseProxy(new GetRoleByIdUseCase(rolesRepository)),
        },
        {
          inject: [RolesRepository, PermissionsRepository],
          provide:
            RBACGeneralUseCaseProxyModule.GET_ALL_ROLES_WITH_PERMISSION_USE_CASE_PROXY,
          useFactory: (
            rolesRepository: RolesRepository,
            permissionRepository: PermissionsRepository,
          ) =>
            new UseCaseProxy(
              new GetAllRolesWithPermissionUseCase(
                rolesRepository,
                permissionRepository,
              ),
            ),
        },
        {
          inject: [RolesRepository, PermissionsRepository],
          provide:
            RBACGeneralUseCaseProxyModule.ASSIGN_PERMISSION_TO_ROLE_USE_CASE_PROXY,
          useFactory: (
            rolesRepository: RolesRepository,
            permissionRepository: PermissionsRepository,
          ) =>
            new UseCaseProxy(
              new AssignPermissionToRoleUseCase(
                rolesRepository,
                permissionRepository,
              ),
            ),
        },
        {
          inject: [RolesRepository],
          provide: RBACGeneralUseCaseProxyModule.UPDATE_ROLE_USE_CASE_PROXY,
          useFactory: (rolesRepository: RolesRepository) =>
            new UseCaseProxy(new UpdateRoleUseCase(rolesRepository)),
        },
        {
          inject: [RolesRepository, PermissionsRepository],
          provide: RBACGeneralUseCaseProxyModule.CREATE_ROLE_USE_CASE_PROXY,
          useFactory: (
            rolesRepository: RolesRepository,
            permissionRepository: PermissionsRepository,
          ) =>
            new UseCaseProxy(
              new CreateRoleUseCase(rolesRepository, permissionRepository),
            ),
        },
      ],
      exports: [
        RBACGeneralUseCaseProxyModule.GET_ALL_PERMISSIONS_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.DELETE_PERMISSIONS_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.GET_PERMISSION_BY_NAME_OR_ID_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.UPDATE_PERMISSION_BY_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.ASSIGN_PERMISSION_TO_ROLE_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.GET_ALL_ROLES_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.GET_ALL_ROLE_USERS_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.GET_ROLE_BY_ID_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.GET_ALL_ROLES_WITH_PERMISSION_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.UPDATE_ROLE_USE_CASE_PROXY,
        RBACGeneralUseCaseProxyModule.CREATE_ROLE_USE_CASE_PROXY,
      ],
    };
  }
}
