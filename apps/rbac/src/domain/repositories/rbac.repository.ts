import { IBaseRepository } from '@app/lib/domain/repositories';
import {
  Permissions,
  Roles,
} from '@app/lib/infrastructure/services/database/entities/rbac.entity';

export interface IRolesRepository extends IBaseRepository<Roles> {
  getRolesWithPermission(permissionId?: string): Promise<Roles[]>;
}

export interface IPermissionsRepository extends IBaseRepository<Permissions> {}
