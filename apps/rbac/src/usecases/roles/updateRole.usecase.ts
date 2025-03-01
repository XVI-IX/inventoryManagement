import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import {
  IPermissionsRepository,
  IRolesRepository,
} from '../../domain/repositories/rbac.repository';
import { Roles } from '@app/lib/infrastructure/services/database/entities/rbac.entity';
import {
  CreateRoleInput,
  UpdateRoleInput,
} from '../../infrastructure/common/schema/rbac.schema';

export class UpdateRoleUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly roleRepository: IRolesRepository,
    private readonly permissionRepository: IPermissionsRepository,
  ) {
    this.logger = new Logger(UpdateRoleUseCase.name);
  }

  async execute(roleId: string, entity: UpdateRoleInput): Promise<Roles> {
    try {
      const roleExists = await this.roleRepository.findOne({
        where: {
          id: roleId,
        },
      });

      if (!roleExists) {
        throw new NotFoundException('Role not found');
      }

      const enabledPermissions = Object.entries(entity.permissions)
        .filter(([_, isEnabled]) => isEnabled)
        .map(([permissionName]) => permissionName);

      const resolvedPermissions =
        await this.permissionRepository.findIn(enabledPermissions);

      delete entity.permissions;
      const updatedRole = await this.roleRepository.update(
        {
          id: roleId,
        },
        {
          ...entity,
          permissions: resolvedPermissions,
        },
      );

      if (!updatedRole) {
        throw new BadRequestException('Role could not be updated');
      }

      return updatedRole;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
