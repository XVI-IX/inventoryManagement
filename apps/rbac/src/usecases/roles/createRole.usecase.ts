import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import {
  IPermissionsRepository,
  IRolesRepository,
} from '../../domain/repositories/rbac.repository';
import { CreateRoleInput } from '../../infrastructure/common/schema/rbac.schema';
import { Roles } from '@app/lib/infrastructure/services/database/entities/rbac.entity';

export class CreateRoleUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly roleRepository: IRolesRepository,
    private readonly permissionRepository: IPermissionsRepository,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(entity: CreateRoleInput): Promise<Roles> {
    try {
      const roleExists = await this.roleRepository.findOne({
        where: {
          name: entity.name,
        },
      });

      console.log(Boolean(roleExists));

      if (roleExists) {
        throw new ConflictException('Role already exists');
      }

      const enabledPermissions = Object.entries(entity.permissions)
        .filter(([permissionName, isEnabled]) => isEnabled)
        .map(([permissionName]) => permissionName);

      const resolvedPermissions =
        await this.permissionRepository.findIn(enabledPermissions);

      const newRole = await this.roleRepository.save({
        ...entity,
        permissions: resolvedPermissions,
      });

      if (!newRole) {
        throw new BadRequestException('Role could not be created');
      }

      return newRole;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
