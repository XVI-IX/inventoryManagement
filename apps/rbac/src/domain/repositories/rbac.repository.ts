import { IBaseRepository } from '@app/lib/domain/repositories';
import { CreatePermissionInput } from '../../infrastructure/common/schema/rbac.schema';
import {
  Permissions,
  RolePermissions,
  Roles,
  UserRoles,
} from '@app/lib/infrastructure/services/database/entities/rbac.entity';
import { Users } from '@app/lib/infrastructure/services/database/entities/user.entity';

export interface IRolesRepository extends IBaseRepository<Roles> {
  getRolesWithPermission(
    name?: string,
    permissionId?: string,
  ): Promise<Roles[]>;
}

export interface IPermissionsRepository extends IBaseRepository<Permissions> {}

export interface IRolePermissionsRepository
  extends IBaseRepository<RolePermissions> {}

export interface IUserRolesRepository extends IBaseRepository<UserRoles> {}
